import { cleanInput } from "./repl";
import { describe, expect, test } from "vitest";
describe.each([
    {
        input: "  hello  world  ",
        expected: ["hello", "world"],
    },
    {
        input: "this is a Test driven DEVELOPMENT project",
        expected: ["this", "is", "a", "test", "driven", "development", "project"],
    },
    {
        input: "  absol charmander MewTWo",
        expected: ["absol", "charmander", "mewtwo"],
    },
    {
        input: "absolute cinema      peak   ",
        expected: ["absolute", "cinema", "peak"],
    },
    {
        input: "charmander bulbasaur ivysaur charizard",
        expected: ["charmander", "bulbasaur", "ivysaur", "charizard"],
    },
    // TODO: more test cases here
])("cleanInput($input)", ({ input, expected }) => {
    test(`Expected: ${expected}`, () => {
        // TODO: call cleanInput with the input here
        //
        // The `expect` and `toHaveLength` functions are from vitest
        // they will fail the test if the condition is not met
        const actual = cleanInput(input);
        expect(actual).toHaveLength(expected.length);
        for (const i in expected) {
            // likewise, the `toBe` function will fail the test if the values are not equal
            expect(actual[i]).toBe(expected[i]);
        }
    });
});
