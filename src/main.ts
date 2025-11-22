import { PokeAPI } from "./pokeapi.js";
import { startREPL } from "./repl.js";
import { initState } from "./state.js";

async function main() {
  const stateObj = initState();
  await startREPL(stateObj);
}

main();
