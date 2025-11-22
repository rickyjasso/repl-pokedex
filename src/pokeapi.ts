export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() { }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    try {
      const response = await fetch(`${PokeAPI.baseURL}/${pageURL}`, {
        method: "GET",
        mode: "cors",
      });

      const result = await response.json();
      const locations: ShallowLocations = {
        locations: result.results,
        next: result.next,
        previous: result.previous
      };
      return locations;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch location areas.")
    }
  }

  /*async fetchLocation(locationName: string): Promise<Location> {
    
  }*/
}

export type ShallowLocations = {
  locations: Location[];
  next: string | null;
  previous: string | null;
};

export type Location = {
  name: string,
  url: string,
};
