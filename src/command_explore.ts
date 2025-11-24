import { State } from "./state.js";

export async function commandExplore(state: State, name: string): Promise<void> {
  const exploreItems = await state.apiObj.fetchLocation(name);
  console.log(`Exploring ${name}`);
  for (const item of exploreItems.pokemon_encounters) {
    console.log(item.pokemon.name);
  }
};
