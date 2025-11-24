import { State } from "./state.js";

export async function commandCatch(state: State, pokemonName: string) {
  if (pokemonName === null || !pokemonName) {
    console.log("ERROR: Please specify a pokemon to catch...");
    return;
  }
  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  const pokeInfo = await state.apiObj.fetchPokemon(pokemonName);

  if ((Math.random() - (pokeInfo.base_experience * 0.001)) > 0.4) {
    console.log(`${pokemonName} was caught!`);
  } else {
    console.log(`${pokemonName} escaped!`);
  }
};
