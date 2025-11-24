import { State } from "./state.js";


export function cleanInput(input: string): string[] {
  let str = input.toLowerCase();
  str = str.trim();
  return str.split(" ").filter(word => word !== "");
}

export function startREPL(state: State) {

  state.readline.prompt();

  state.readline.on("line", async (input: string) => {
    let res = cleanInput(input);
    if (res.length === 0) {
      state.readline.prompt();
      return;
    }

    const cmd = state.commands[res[0]];
    if (!cmd) {
      console.log(
        `Unkown command: "${res[0]}". Type "help" for a list of commands.`
      );
      state.readline.prompt();
      return;
    }

    try {
      await cmd.callback(state, res[1]);
    } catch (error) {
      console.log(error);
    }

    state.readline.prompt();
  });

}
