import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";
export type State = {
  readline: Interface,
  commands: Record<string, CLICommand>,
  apiObj: PokeAPI,
  nextLocationsURL: string,
  prevLocationsURL: string,
};

export type CLICommand = {
  name: string,
  description: string,
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > "
  });

  const commands = getCommands();
  return {
    readline: rl,
    commands: commands,
    apiObj: new PokeAPI(500),
    nextLocationsURL: "",
    prevLocationsURL: ""
  };
}
