export async function commandMap(state) {
    const mapItems = await state.apiObj.fetchLocations(state.nextLocationsURL);
    state.prevLocationsURL = mapItems.previous;
    state.nextLocationsURL = mapItems.next;
    for (const obj of mapItems.locations) {
        console.log(obj.name);
    }
}
export async function commandMapb(state) {
    if (state.prevLocationsURL === undefined || state.prevLocationsURL === null) {
        console.log("You are on the first page!");
        return;
    }
    const mapItems = await state.apiObj.fetchLocations(state.prevLocationsURL);
    state.prevLocationsURL = mapItems.previous;
    state.nextLocationsURL = mapItems.next;
    for (const obj of mapItems.locations) {
        console.log(obj.name);
    }
}
