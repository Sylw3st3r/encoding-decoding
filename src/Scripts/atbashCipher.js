const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
];
const reverseAlphabet = [...alphabet].reverse();

export function atbash(text) {
    if (typeof text !== "string") {
        return "";
    }

    const upperCaseText = text.toUpperCase();

    return upperCaseText
        .split("")
        .map(char => {
            const index = alphabet.findIndex(letter => letter === char);
            if (index !== -1) {
                return reverseAlphabet[index];
            }
            return char;
        })
        .join("");
}
