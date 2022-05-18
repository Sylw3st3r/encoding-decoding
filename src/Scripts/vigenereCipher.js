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

export function vigenereEncode(message, key) {
    if (
        typeof message !== "string" ||
        typeof key !== "string" ||
        !message.length ||
        !key.length
    ) {
        return "";
    }

    let cipher = "";
    let key2 = key.toUpperCase().replace(/[^A-Z]/g, "");
    key2 = key2.length ? key2 : "A";

    for (let i = 0, j = 0; i < message.length; i++) {
        let current = message[i].toUpperCase();
        let l = current.charCodeAt(0);
        let k = key2[j % key2.length];

        if (l >= 65 && l <= 90) {
            let upperLetter = (l - 65 + (k.charCodeAt(0) - 65)) % 26;
            cipher += String.fromCharCode(upperLetter + 65);
            j++;
        } else {
            cipher += current;
        }
    }

    return cipher;
}

export function vigenereDecode(message, key) {
    return vigenereEncode(message, reverseKey(key));
}
export function reverseKey(key) {
    if (typeof key !== "string") {
        return "A";
    }

    return key
        .toUpperCase()
        .split("")
        .map(char => {
            const index = alphabet.findIndex(letter => letter === char);
            if (index !== -1) {
                return alphabet[(26 - index) % 26];
            } else {
                return char;
            }
        })
        .join("");
}
