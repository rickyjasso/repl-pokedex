export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    constructor() { }
    async fetchLocations(pageURL) {
        try {
            const response = await fetch(`${PokeAPI.baseURL}/${pageURL}`, {
                method: "GET",
                mode: "cors",
            });
            const result = await response.json();
            const locations = {
                locations: result.results,
                next: result.next,
                previous: result.previous
            };
            return locations;
        }
        catch (error) {
            console.log(error);
            throw new Error("Failed to fetch location areas.");
        }
    }
}
