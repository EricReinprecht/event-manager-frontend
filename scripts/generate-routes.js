/// <reference types="node" />
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
const envPath = '.env.local';
if (fs.existsSync(envPath)) {
    const env = fs.readFileSync(envPath, 'utf8');
    env.split('\n').forEach((line) => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
}
const apiPath = process.env.VITE_API_PATH;
if (!apiPath) {
    console.error('Missing VITE_API_PATH in .env.local');
    process.exit(1);
}
console.log(`Generating routes from: ${apiPath}`);
execSync('go run ./cmd/generate-routes', {
    cwd: path.resolve(apiPath),
    stdio: 'inherit',
});
