import { atbash } from "../Scripts/atbashCipher";

describe("function - atbash", () => {
    test("Atbash cipher corectly encodes message", () => {
        const atbashEncodedMessage = atbash("SYLWESTER");

        expect(atbashEncodedMessage).toBe("HBODVHGVI");
    });

    test("Atbash cipher corectly decodes message", () => {
        const atbashDecodedMessage = atbash("HBODVHGVI");

        expect(atbashDecodedMessage).toBe("SYLWESTER");
    });

    test("Atbash cipher ignores characters that do not belong to a-z and A-Z range", () => {
        const atbashEncodedMessage = atbash("SYLWE*STER");

        expect(atbashEncodedMessage).toBe("HBODV*HGVI");
    });

    test("Parameter passed to function with type diferent than string will result in empty string being returned", () => {
        const atbashEncodedMessage = atbash({});

        expect(atbashEncodedMessage).toBe("");
    });

    test("Casing of the message should be ignored", () => {
        const atbashEncodedMessage = atbash("atbash");
        const atbashEncodedMessage2 = atbash("ATBASH");

        expect(atbashEncodedMessage).toBe(atbashEncodedMessage2);
    });
});
