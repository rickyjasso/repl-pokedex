import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  cache: Cache;
  constructor(interval: number) {
    this.cache = new Cache(interval);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;
    const cacheObj = this.cache.get(url);
    if (cacheObj !== undefined) {
      return cacheObj as ShallowLocations;
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
      });

      const result = await response.json();
      const locations: ShallowLocations = {
        locations: result.results,
        next: result.next,
        previous: result.previous
      };
      this.cache.add(url, locations);
      return locations;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch location areas.")
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const cached = this.cache.get<Location>(url);
    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }

      const location: Location = await response.json();
      this.cache.add(url, location);
      return location;
    } catch (error) {
      throw new Error(`Error fetching location '${locationName}': ${(error as Error).message}`);
    }
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      const pokemon: Pokemon = {
        name: result.name,
        base_experience: result.base_experience
      }
      return pokemon;

    } catch (error) {
      throw new Error(`Error fetching pokemon '${pokemonName}': ${(error as Error).message}`);
    }
  };
}

export type Pokemon = {
  name: string,
  base_experience: number
}

export type ShallowLocations = {
  locations: Location[];
  next: string;
  previous: string;
};

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};
