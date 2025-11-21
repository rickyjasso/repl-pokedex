export function commandHelp(commands) {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:\n");
    for (const key of Object.keys(commands)) {
        console.log(`${commands[key].name}: ${commands[key].description}`);
    }
}
