import {
    findCorespondingPair,
    findLocation,
    fourSquareEncode,
    fourSquareDecode,
    getTransformedAlphabet,
} from "../Scripts/fourSquareCipher";

const a = ["A", "B", "C", "D", "E"];
const b = ["F", "G", "H", "I", "K"];
const c = ["L", "M", "N", "O", "P"];
const d = ["Q", "R", "S", "T", "U"];
const e = ["V", "W", "X", "Y", "Z"];

const normalAlphabet2D = [a, b, c, d, e];

const a2 = ["C", "A", "B", "D", "E"];

describe("function - getTransformedAlphabet", () => {
    test("getTransformedAlphabet with parameter being empty string should return alphabet in 2d", () => {
        const alphabet = getTransformedAlphabet("");

        expect(alphabet).toEqual(normalAlphabet2D);
    });

    test("getTransformedAlphabet should return array 2d with the parameter's characters placed first and never used characters second", () => {
        const alphabet = getTransformedAlphabet("cabde");

        expect(alphabet).toEqual([a2, b, c, d, e]);
    });

    test("Parameter's characters that are outside of a-z and A-Z range should be ignored", () => {
        const alphabet = getTransformedAlphabet("c!a@b%%^d*e");

        expect(alphabet).toEqual([a2, b, c, d, e]);
    });

    test("If parameter contains j or J then it should be replaced with i or I respectively", () => {
        const alphabet = getTransformedAlphabet("c!a@b%%^d*e");

        expect(alphabet).toEqual([a2, b, c, d, e]);
    });

    test("All duplicate characters in parameter should get ignored", () => {
        const alphabet = getTransformedAlphabet(
            "c!a@b%%^d*ec!a@b%%^d*ec!a@b%%^d*ec!a@b%%^d*e"
        );

        expect(alphabet).toEqual([a2, b, c, d, e]);
    });

    test("If parameter is of type that is not string then normal alphabet should get returned", () => {
        const alphabet = getTransformedAlphabet({});

        expect(alphabet).toEqual(normalAlphabet2D);
    });
});

describe("function - findLocation", () => {
    test("findLocation should return location of first parameter in second parameter(array) (index of row and index of column)", () => {
        const location = findLocation("E", [a, b, c, d, e]);

        expect(location).toEqual({ i: 0, j: 4 });
    });

    test("If location of first parameter cant be found that {i:-1,j:-1} should be returned", () => {
        const location = findLocation("J", [a, b, c, d, e]);

        expect(location).toEqual({ i: -1, j: -1 });
    });

    test("If the second parameter isn't an 2d array then {i:-1,j:-1} should be returned", () => {
        const location = findLocation("J", a);

        expect(location).toEqual({ i: -1, j: -1 });
    });
});

describe("function - findCorespondingPair", () => {
    test("If coresponding pair cant be found then it should return `??`", () => {
        const pair = findCorespondingPair(
            "j",
            "i",
            normalAlphabet2D,
            normalAlphabet2D,
            normalAlphabet2D,
            normalAlphabet2D
        );

        expect(pair).toBe("??");
    });

    test("If one or more of las 4 parameters isn't a 2D array then `??` should be returned", () => {
        const pair = findCorespondingPair(
            "j",
            "i",
            normalAlphabet2D,
            {},
            normalAlphabet2D,
            normalAlphabet2D
        );

        expect(pair).toBe("??");
    });

    test("If one or both of 2 found values is of type different than string then `??` should be returned", () => {
        const pair = findCorespondingPair(
            "a",
            "a",
            normalAlphabet2D,
            [[{}, {}, {}], b, c, d, e],
            normalAlphabet2D,
            normalAlphabet2D
        );

        expect(pair).toBe("??");
    });

    test("Coresponding pair should be found", () => {
        const pair = findCorespondingPair(
            "A",
            "Z",
            normalAlphabet2D,
            normalAlphabet2D,
            normalAlphabet2D,
            normalAlphabet2D
        );

        expect(pair).toBe("EV");
    });
});

describe("functions - fourSquareEncode and fourSquareDecode", () => {
    test("If message or key or key2 isn't of type string then fourSquareEncode and fourSquareDecode should return ``)", () => {
        const message = fourSquareEncode("message", {}, []);

        expect(message).toBe("");
    });

    test("fourSquareEncode should correctly encode message", () => {
        const message = fourSquareEncode("SYLWESTERKUCIA", "", "");

        expect(message).toBe("TXMVCUUDUGSEFD");
    });

    test("Characters from outside of a-z A-Z should get ignored", () => {
        const message = fourSquareEncode("SYLWESTER*KUCIA", "", "");

        expect(message).toBe("TXMVCUUD*UGSEFD");
    });

    test("Decoder corectly decodes encoded message", () => {
        const encodedMessage = fourSquareEncode(
            "FOURSQUAREENCODEDMESAGEDECODEDBACK",
            "foursquare",
            "randomkey"
        );
        const decodedMessage = fourSquareDecode(
            encodedMessage,
            "foursquare",
            "randomkey"
        );

        expect(decodedMessage).toBe("FOURSQUAREENCODEDMESAGEDECODEDBACK");
    });

    test("Message encoded by decoder function should be corectly decoded by encoder", () => {
        const encodedMessage = fourSquareDecode(
            "FOURSQUAREENCODEDMESAGEDECODEDBACK",
            "foursquare",
            "randomkey"
        );
        const decodedMessage = fourSquareEncode(
            encodedMessage,
            "foursquare",
            "randomkey"
        );

        expect(decodedMessage).toBe("FOURSQUAREENCODEDMESAGEDECODEDBACK");
    });

    test("If message contains j or J then it should be replaced by i or I respectively", () => {
        const encodedMessage = fourSquareEncode("jj", "", "");
        const decodedMessage = fourSquareDecode(encodedMessage, "", "");

        expect(decodedMessage).toBe("II");
    });

    test("If message contains uneven number of valid characters(a-z without j or  A-Z without J) then Q should ba added as padding", () => {
        const encodedMessage = fourSquareEncode("z", "", "");
        const decodedMessage = fourSquareDecode(encodedMessage, "", "");

        expect(decodedMessage.split("").pop()).toBe("Q");
    });
});
