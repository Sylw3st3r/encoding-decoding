import {
    reverseKey,
    vigenereEncode,
    vigenereDecode,
} from "../Scripts/vigenereCipher";

describe("function - reverseKey", () => {
    test("Key should get correctly transformed", () => {
        const key = reverseKey("TAJNE");

        expect(key).toBe("HARNW");
    });

    test("Passing parameter of type different than string should result in `A` being returned", () => {
        const key = reverseKey({});

        expect(key).toBe("A");
    });

    test("All characters in parameter tjat do not belong to a-z or A-Z range should get ignored", () => {
        const key = reverseKey("B*B");

        expect(key).toBe("Z*Z");
    });

    test("Key with length equal to 0 should return ``", () => {
        const key = reverseKey("");

        expect(key).toBe("");
    });
});

describe("function - vigenereEncode", () => {
    test("Function should correctly encode message", () => {
        const encoded = vigenereEncode("TO JEST BARDZO TAJNY TEKST", "TAJNE");

        expect(encoded).toBe("MO SRWM BJEHSO CNNGY CROLT");
    });

    test("Casing should get ignored", () => {
        const encoded = vigenereEncode("to jest bardzo tajny tekst", "tajne");

        expect(encoded).toBe("MO SRWM BJEHSO CNNGY CROLT");
    });

    test("Passing key parameter with type different than string should result in `` being returned", () => {
        const encoded = vigenereEncode("wiadomosc", {});

        expect(encoded).toBe("");
    });

    test("Passing message parameter with type different than string should result in `` being returned", () => {
        const encoded = vigenereEncode({}, "klucz");

        expect(encoded).toBe("");
    });

    test("If key parameter's length is 0 then `` should be returned", () => {
        const encoded = vigenereEncode("wiadomosc", "");

        expect(encoded).toBe("");
    });

    test("If message parameter's length is 0 then `` should be returned", () => {
        const encoded = vigenereEncode("", "klucz");

        expect(encoded).toBe("");
    });

    test("Characters that do not belong in a-z or A-Z range should get ignored(not changed)", () => {
        const encoded = vigenereEncode("ABC???D%^S111", "B");

        expect(encoded).toBe("BCD???E%^T111");
    });
});

describe("function - vigenereDecode", () => {
    test("Function should correctly decode message", () => {
        const encoded = vigenereEncode("TO JEST BARDZO TAJNY TEKST", "TAJNE");
        const decoded = vigenereDecode(encoded, "tajne");

        expect(decoded).toBe("TO JEST BARDZO TAJNY TEKST");
    });

    test("Casing should get ignored", () => {
        const decoded = vigenereDecode("to jest bardzo tajny tekst", "tajne");

        expect(decoded).toBe("AO AROA BREZGO KNFUY KRGZT");
    });

    test("Passing key parameter with type different than string should result in message being returned", () => {
        const decoded = vigenereDecode("wiadomosc", {});

        expect(decoded).toBe("WIADOMOSC");
    });

    test("Passing message parameter with type different than string should result in `` being returned", () => {
        const decoded = vigenereDecode({}, "klucz");

        expect(decoded).toBe("");
    });

    test("If key parameter's length is 0 then `` should be returned", () => {
        const decoded = vigenereDecode("wiadomosc", "");

        expect(decoded).toBe("");
    });

    test("If message parameter's length is 0 then `` should be returned", () => {
        const decoded = vigenereDecode("", "klucz");

        expect(decoded).toBe("");
    });

    test("Characters that do not belong in a-z or A-Z range should get ignored(not changed)", () => {
        const decoded = vigenereDecode("BCD???E%^T111", "B");

        expect(decoded).toBe("ABC???D%^S111");
    });
});
