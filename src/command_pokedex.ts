import { State } from "./state.js";

export async function commandPokedex(state: State) {
  console.log("Your Pokedex:");
  for (const key in state.pokedex) {
    console.log(`\t- ${state.pokedex[key].name}`);
  }
};
