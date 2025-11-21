import { createInterface } from "node:readline";
import { getCommands } from "./commands.js";


export function cleanInput(input: string): string[] {
  let str = input.toLowerCase();
  str = str.trim();
  return str.split(" ").filter(word => word !== "");
}

export function startREPL() {

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > "
  });

  rl.prompt();

  rl.on("line", (input: string) => {
    let res = cleanInput(input);
    if (res.length === 0) {
      rl.prompt();
      return;
    }

    const commands = getCommands();
    const cmd = commands[res[0]];
    if (!cmd) {
      console.log(
        `Unkown command: "${res[0]}". Type "help" for a list of commands.`
      );
      rl.prompt();
      return;
    }

    try {
      cmd.callback(commands);
    } catch (error) {
      console.log(error);
    }

    rl.prompt();
  });

}
