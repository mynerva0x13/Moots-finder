import * as crypto from 'node:crypto';
import {keyFinder} from "./IV_key.ts"


const algorithm = 'aes-256-cbc';
const { key, iv } = keyFinder();

console.log("key"+key)
console.log("IV"+crypto.randomBytes(16))

// Encrypt function
export function encrypt(text: string): string {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// Decrypt function
export function decrypt(encryptedText: string): string {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}