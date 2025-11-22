import { State } from "./state.js";

export async function commandMap(state: State) {
  let path = "location-area";
  if (state.nextLocationsURL !== null && state.nextLocationsURL !== undefined) {
    path = state.nextLocationsURL.replace("https://pokeapi.co/api/v2/", "");
  }

  const mapItems = await state.apiObj.fetchLocations(path);
  state.prevLocationsURL = mapItems.previous;
  state.nextLocationsURL = mapItems.next;
  for (const obj of mapItems.locations) {
    console.log(obj.name);
  }
}

export async function commandMapb(state: State) {
  if (state.prevLocationsURL === undefined || state.prevLocationsURL === null) {
    console.log("You are on the first page!");
    return;
  }
  const mapItems = await state.apiObj.fetchLocations(state.prevLocationsURL.replace("https://pokeapi.co/api/v2/", ""));
  state.prevLocationsURL = mapItems.previous;
  state.nextLocationsURL = mapItems.next;
  for (const obj of mapItems.locations) {
    console.log(obj.name);
  }

}

