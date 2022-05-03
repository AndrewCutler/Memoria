import { ModeOfOperation, utils } from 'aes-js';

const key = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3];

export const encrypt = (text: string): string => {
    const bytes = utils.utf8.toBytes(text);
    const ctr = new ModeOfOperation.ctr(key);
    const encryptedBytes = ctr.encrypt(bytes);
    const encryptedHex = utils.hex.fromBytes(encryptedBytes);

    return encryptedHex;
}

export const decrypt = (hex: string): string => {
    const encryptedBytes = utils.hex.toBytes(hex);
    const ctr = new ModeOfOperation.ctr(key);
    const decryptedBytes = ctr.decrypt(encryptedBytes)
    const decryptedText = utils.utf8.fromBytes(decryptedBytes);

    return decryptedText;
}