import { createInterface } from "node:readline";

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

  rl.prompt()
  rl.on("line", (input: string) => {
    let res = cleanInput(input);
    if (res.length === 0) {
      rl.prompt();
    }
    else {
      console.log(`Your command was: ${res[0]}`)
      rl.prompt();
    }
  })


}
