import { initialMysteries } from "./data/mysteries.js";

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export let mysteries = deepCopy(initialMysteries);

export function resetMysteries() {
  mysteries = deepCopy(initialMysteries);
}

export function findMysteryById(id) {
  return mysteries.find((m) => m.id === id);
}
