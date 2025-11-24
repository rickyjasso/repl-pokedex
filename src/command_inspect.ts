import { State } from "./state.js";
export async function commandInspect(state: State, pokemonName: string) {
  if (!(pokemonName in state.pokedex)) {
    console.log(`you have not caught ${pokemonName}`);
    return;
  }
  const pokemon = await state.apiObj.fetchPokemon(pokemonName);

  console.log(`Name: ${pokemon.name}`);
  console.log(`Height: ${pokemon.height}`);
  console.log(`Weight: ${pokemon.weight}`);
  console.log("Stats:");
  for (const stat of pokemon.stats) {
    console.log(`\t-${stat.stat.name}: ${stat.base_stat}`);
  }
  console.log("Types:");
  for (const type of pokemon.types) {
    console.log(`\t-${type.type.name}`);
  }
}
