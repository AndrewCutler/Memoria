const isValidUriCharacter = (letter: string): boolean => /^[!#$&-;=?-[]_a-z~]+$/.test(letter);

export const cipher = (text: string, shift: number): string => {
    const transform = text.split('').map((letter) => {
        const shifted = String.fromCharCode(letter.charCodeAt(0) + shift);

        return encodeURIComponent(shifted);
        // is this necessary?
        // if (isValidUriCharacter(shifted)) {
        //     return shifted;
        // }

        // return '%' + String.fromCharCode(letter.charCodeAt(0) + shift);
    }).join('');;
    console.log(transform);
    return transform;
}

export const decipher = (text: string, shift: number): string => {
    const transform = text.split('').map((letter) => {
        const shifted = String.fromCharCode(letter.charCodeAt(0) - shift);

        return decodeURIComponent(shifted);
    }).join('');
    console.log(transform);
    return transform;
}