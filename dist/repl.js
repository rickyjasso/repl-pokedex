export function cleanInput(input) {
    let str = input.toLowerCase();
    str = str.trim();
    return str.split(" ").filter(word => word !== "");
}
export function startREPL(state) {
    state.readline.prompt();
    state.readline.on("line", async (input) => {
        let res = cleanInput(input);
        if (res.length === 0) {
            state.readline.prompt();
            return;
        }
        const cmd = state.commands[res[0]];
        if (!cmd) {
            console.log(`Unkown command: "${res[0]}". Type "help" for a list of commands.`);
            state.readline.prompt();
            return;
        }
        try {
            await cmd.callback(state);
        }
        catch (error) {
            console.log(error);
        }
        state.readline.prompt();
    });
}
