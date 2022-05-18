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

export const getTransformedAlphabet = keyValue => {
    let allChars = [...alphabet];

    if (typeof keyValue === "string") {
        allChars = keyValue
            .toUpperCase()
            .replace(/[J]/g, "I")
            .replace(/[^A-IK-Z]/g, "")
            .split("")
            .concat(alphabet);
    }

    const data = [...new Set(allChars)];
    const newArr = [];
    while (data.length) newArr.push(data.splice(0, 5));

    return newArr;
};

export const findLocation = (char, squareAlphabet) => {
    const defaultLocation = { i: -1, j: -1 };

    if (!Array.isArray(squareAlphabet)) return defaultLocation;

    for (let i = 0; i < squareAlphabet.length; i++) {
        if (!Array.isArray(squareAlphabet)) return defaultLocation;

        for (let j = 0; j < squareAlphabet[i].length; j++) {
            if (squareAlphabet[i][j] === char) {
                return { i: i, j: j };
            }
        }
    }

    return defaultLocation;
};

export const fourSquareDecode = (message, key1, key2) => {
    if (
        typeof message !== "string" ||
        typeof key1 !== "string" ||
        typeof key2 !== "string"
    ) {
        return "";
    }

    const leftTop = getTransformedAlphabet(key1);
    const rightBottom = getTransformedAlphabet(key2);
    const squareAlphabet = getTransformedAlphabet(alphabet.join(""));

    return fourSquareLogic(
        message,
        leftTop,
        squareAlphabet,
        squareAlphabet,
        rightBottom
    );
};

export const fourSquareEncode = (message, key1, key2) => {
    if (
        typeof message !== "string" ||
        typeof key1 !== "string" ||
        typeof key2 !== "string"
    ) {
        return "";
    }

    const leftTop = getTransformedAlphabet(key1.toUpperCase());
    const rightBottom = getTransformedAlphabet(key2.toUpperCase());
    const squareAlphabet = getTransformedAlphabet(alphabet.join(""));

    return fourSquareLogic(
        message,
        squareAlphabet,
        leftTop,
        rightBottom,
        squareAlphabet
    );
};

const fourSquareLogic = (m, leftTop, rightTop, leftBottom, rightBottom) => {
    const message = m.toUpperCase().replace(/[J]/g, "I");
    let out = "";
    let first = "";

    for (let char of message.split("")) {
        if (!alphabet.includes(char)) {
            out += char;
            continue;
        }

        if (!first) {
            first = char;
        } else {
            const a = findCorespondingPair(
                first,
                char,
                leftTop,
                rightTop,
                leftBottom,
                rightBottom
            );
            out += a;
            first = "";
        }
    }

    if (first) {
        const a = findCorespondingPair(
            first,
            "Q",
            leftTop,
            rightTop,
            leftBottom,
            rightBottom
        );
        out += a;
    }

    return out;
};

export const findCorespondingPair = (
    first,
    second,
    leftTop,
    rightTop,
    leftBottom,
    rightBottom
) => {
    const { i: i1, j: j1 } = findLocation(first, leftTop);
    const { i: i2, j: j2 } = findLocation(second, rightBottom);

    if (
        i1 === -1 ||
        i2 === -1 ||
        !Array.isArray(leftTop) ||
        !Array.isArray(leftBottom) ||
        !Array.isArray(rightTop) ||
        !Array.isArray(rightBottom) ||
        typeof rightTop[i1][j2] !== "string" ||
        typeof leftBottom[i2][j1] !== "string"
    ) {
        return "??";
    }

    return rightTop[i1][j2] + leftBottom[i2][j1];
};
