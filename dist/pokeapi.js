import { Cache } from "./pokecache.js";
export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    cache;
    constructor(interval) {
        this.cache = new Cache(interval);
    }
    async fetchLocations(pageURL) {
        const url = pageURL || `${PokeAPI.baseURL}/location-area`;
        const cacheObj = this.cache.get(url);
        if (cacheObj !== undefined) {
            return cacheObj;
        }
        try {
            const response = await fetch(url, {
                method: "GET",
                mode: "cors",
            });
            const result = await response.json();
            const locations = {
                locations: result.results,
                next: result.next,
                previous: result.previous
            };
            this.cache.add(url, locations);
            return locations;
        }
        catch (error) {
            console.log(error);
            throw new Error("Failed to fetch location areas.");
        }
    }
    async fetchLocation(locationName) {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        const cached = this.cache.get(url);
        if (cached) {
            return cached;
        }
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            const location = await response.json();
            this.cache.add(url, location);
            return location;
        }
        catch (error) {
            throw new Error(`Error fetching location '${locationName}': ${error.message}`);
        }
    }
}
