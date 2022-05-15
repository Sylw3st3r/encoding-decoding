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

export function vigenere(message, key) {
    let cipher = "";

    let key2 = key.toUpperCase().trim();
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
export function reverseKe(key) {
    return key
        .split("")
        .map(char => {
            const index = alphabet.findIndex(
                letter => letter === char.toUpperCase()
            );
            if (index !== -1) {
                return alphabet[(26 - index) % 26];
            } else {
                return char;
            }
        })
        .join("");
}
