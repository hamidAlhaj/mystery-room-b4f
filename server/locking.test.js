import test from "node:test";
import assert from "node:assert/strict";
import { once } from "node:events";
import app from "./app.js";
import { mysteries } from "./store.js";
import { initialMysteries } from "./data/mysteries.js";

test("Phase 2 only unlocks after all three correct Phase 1 answers", async (t) => {
  mysteries.splice(0, mysteries.length, ...structuredClone(initialMysteries));
  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(() => {
    server.close();
    mysteries.splice(0, mysteries.length, ...structuredClone(initialMysteries));
  });
  const base = `http://127.0.0.1:${server.address().port}/api/mysteries`;
  async function request(path, method = "GET", answer) {
    const response = await fetch(base + path, {
      method,
      headers: { "Content-Type": "application/json" },
      body: answer === undefined ? undefined : JSON.stringify({ answer }),
    });
    return { status: response.status, data: await response.json() };
  }
  async function assertLocked() {
    const { data: all } = await request("");
    const { data: detail } = await request("/2");
    for (const phase of [all.find((item) => item.id === 2), detail]) {
      assert.equal(phase.locked, true);
      assert.equal(phase.currentQuestion, "");
      assert.deepEqual(phase.currentOptions, []);
      assert.equal(phase.currentHint, "");
      assert.equal(phase.hintsRemaining, 0);
      assert.equal(phase.reveal, null);
      assert.equal(phase.stages, undefined);
    }
    const before = structuredClone(mysteries[1]);
    assert.equal((await request("/2/answers", "POST", "anything")).status, 403);
    assert.equal((await request("/2/hint", "PATCH")).status, 403);
    assert.deepEqual(mysteries[1], before);
  }
  await assertLocked();
  await request("/1"); // Visiting and requesting hints must not complete a stage.
  await request("/1/hint", "PATCH");
  assert.equal((await request("/1/answers", "POST", "wrong answer")).data.correct, false);
  await assertLocked();
  assert.equal(initialMysteries[0].stages.length, 3);
  for (const [index, stage] of initialMysteries[0].stages.entries()) {
    const answer = Array.isArray(stage.answer) ? stage.answer[0] : stage.answer;
    assert.equal((await request("/1/answers", "POST", answer)).data.correct, true);
    if (index < 2) await assertLocked();
  }
  assert.equal((await request("/1")).data.solved, true);
  const { data: phase2 } = await request("/2");
  assert.equal(phase2.locked, false);
  assert.equal(phase2.currentQuestion, initialMysteries[1].stages[0].question);
  assert.equal((await request("")).data.find((item) => item.id === 2).locked, false);
  assert.equal((await request("/2/hint", "PATCH")).status, 200);
  assert.equal((await request("/2/answers", "POST", "wrong answer")).status, 200);
});
