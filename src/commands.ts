import { commandCatch } from "./command_catch.js";
import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandInspect } from "./command_inspect.js";
import { commandMap, commandMapb } from "./command_map.js";
import { commandPokedex } from "./command_pokedex.js";
import type { CLICommand } from "./state.js"


export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Displays a list of 20 location areas.",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displays the previous 20 location areas.",
      callback: commandMapb,
    },
    explore: {
      name: "explore <area_name>",
      description: "Displays pokemon in a given area",
      callback: commandExplore,
    },
    catch: {
      name: "catch <pokemon>",
      description: "Attempts to catch a wild pokemon",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect <pokemon>",
      description: "Show information about a pokemon in your pokedex",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "Show the pokemon you have caught",
      callback: commandPokedex,
    }
  };
}
