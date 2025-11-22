import { createInterface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";
export function initState() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });
    const commands = getCommands();
    return {
        readline: rl,
        commands: commands,
        apiObj: new PokeAPI(),
        nextLocationsURL: null,
        prevLocationsURL: null
    };
}
