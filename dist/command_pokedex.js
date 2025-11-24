export async function commandPokedex(state) {
    console.log("Your Pokedex:");
    for (const key in state.pokedex) {
        console.log(`\t- ${state.pokedex[key].name}`);
    }
}
;
