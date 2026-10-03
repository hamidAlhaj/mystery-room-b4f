import assert from "node:assert/strict";
import { after, before, beforeEach, test } from "node:test";
import app from "../app.js";
import { initialMysteries } from "../data/mysteries.js";
import { resetMysteries, findMysteryById } from "../store.js";

let server;
let baseUrl;

before(async () => {
  server = await new Promise((resolve) => {
    const listener = app.listen(0, "127.0.0.1", () => resolve(listener));
  });
  baseUrl = `http://127.0.0.1:${server.address().port}/api/mysteries`;
});

after(() => new Promise((resolve, reject) => {
  server.close((error) => error ? reject(error) : resolve());
}));

beforeEach(() => resetMysteries());

async function request(path = "", method = "GET", body) {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  return { status: response.status, data: await response.json() };
}

test("both mysteries are listed without exposing accepted answers", async () => {
  const { status, data } = await request();
  assert.equal(status, 200);
  assert.deepEqual(data.map(({ id }) => id), [1, 2]);
  for (const mystery of data) {
    assert.equal("stages" in mystery, false);
    assert.equal("answer" in mystery, false);
    assert.equal(mystery.reveal, null);
    assert.equal(mystery.hintsRemaining, 3);
    const details = await request(`/${mystery.id}`);
    assert.deepEqual(details.data, mystery);
    const clues = await request(`/${mystery.id}/clues`);
    assert.equal(clues.status, 200);
    assert.equal(clues.data.length, mystery.totalStages);
    assert.ok(clues.data.every((clue) => typeof clue.text === "string"));
  }
});

test("both multiple-choice and free-text mysteries can be completed", async () => {
  for (const [id, answers] of [[1, [" BRASS ", "42", "12"]], [2, [" قاف ", "يلعب الشطرنج", "١٠"]]]) {
    for (let stage = 0; stage < answers.length; stage += 1) {
      const wrong = await request(`/${id}/answers`, "POST", { answer: "wrong" });
      assert.equal(wrong.status, 200);
      assert.equal(wrong.data.correct, false);
      assert.equal((await request(`/${id}`)).data.currentStage, stage);
      const result = await request(`/${id}/answers`, "POST", { answer: answers[stage] });
      assert.equal(result.status, 200);
      assert.equal(result.data.correct, true);
      assert.equal(result.data.nextStage, stage === 2 ? null : stage + 1);
    }
    const completed = (await request(`/${id}`)).data;
    assert.equal(completed.solved, true);
    assert.ok(completed.reveal.length > 50);
    assert.equal(completed.currentQuestion, "");
    assert.deepEqual(completed.currentOptions, []);
    assert.equal((await request(`/${id}/answers`, "POST", { answer: "10" })).status, 409);
    assert.equal((await request(`/${id}/hint`, "PATCH")).status, 409);
  }
});

test("every supplied free-text alias is accepted", async () => {
  for (const [stageIndex, stage] of initialMysteries[1].stages.entries()) {
    for (const answer of stage.answer) {
      resetMysteries();
      findMysteryById(2).currentStage = stageIndex;
      const result = await request("/2/answers", "POST", { answer });
      assert.equal(result.status, 200);
      assert.equal(result.data.correct, true, answer);
    }
  }
});

test("invalid answers and missing mysteries return the expected errors", async () => {
  for (const body of [undefined, {}, [], { answer: "" }, { answer: "   " }, { answer: 10 }, { answer: ["ق"] }, { answer: "a".repeat(201) }]) {
    assert.equal((await request("/2/answers", "POST", body)).status, 400);
    assert.equal(findMysteryById(2).currentStage, 0);
  }
  for (const [path, method] of [["", "GET"], ["/clues", "GET"], ["/answers", "POST"], ["/hint", "PATCH"]]) {
    assert.equal((await request(`/999${path}`, method)).status, 404);
  }
});

test("malformed JSON and unknown routes produce readable errors", async () => {
  const response = await fetch(`${baseUrl}/1/answers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: '{"answer":',
  });
  assert.equal(response.status, 400);
  assert.match((await response.json()).error, /valid JSON/);
  assert.equal((await request("/1/unknown")).status, 404);
  assert.equal(findMysteryById(1).currentStage, 0);
});

test("the three-hint budget is enforced separately for each mystery", async () => {
  for (const id of [1, 2]) {
    for (const remaining of [2, 1, 0]) {
      const result = await request(`/${id}/hint`, "PATCH");
      assert.equal(result.status, 200);
      assert.equal(result.data.hintsRemaining, remaining);
      assert.ok(result.data.hint);
    }
    assert.equal((await request(`/${id}/hint`, "PATCH")).status, 409);
    assert.equal((await request(`/${id}`)).data.hintsUsed, 3);
  }
});
