import { Buffer } from 'node:buffer';
import * as crypto from 'node:crypto';
import * as dotenv from 'dotenv';
import * as fs from 'node:fs';

// Load the environment variables
dotenv.config();

// Check if SECRET_KEY exists in the .env file
let key: Buffer;
let iv: Buffer;

const secretKey = process.env.SECRET_KEY;
export const keyFinder = () => {
    if (secretKey) {
        // If SECRET_KEY exists, decode it from base64 and assign it
        key = Buffer.from(secretKey, 'base64');
        iv = Buffer.from(process.env.IV || '', 'base64');
        console.log('SECRET_KEY found in .env, using existing key and IV.', secretKey);
        return { key, iv };
    } else {
        // If SECRET_KEY doesn't exist, generate a new one
        key = crypto.randomBytes(32);  // Generate a 32-byte key
        iv = crypto.randomBytes(16);   // Generate a 16-byte IV (Initialization Vector)

        const keyBase64 = key.toString('base64');
        const ivBase64 = iv.toString('base64');

        // Prepare the content to append to the .env file
        const envContent = `SECRET_KEY=${keyBase64}\nIV=${ivBase64}\n`;

        // Write the new key and IV to the .env file (create if doesn't exist)
        if (!fs.existsSync('.env')) {
            fs.writeFileSync('.env', envContent); // If .env doesn't exist, create it
        } else {
            fs.appendFileSync('.env', envContent); // If .env exists, append the content
        }

        console.log('Generated new SECRET_KEY and IV, saved to .env');
        return { key, iv };
    }
};
