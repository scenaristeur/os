import { createRequire } from 'module';
const require = createRequire(import.meta.url)

const readline = require('readline');

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}


const ans = await askQuestion("> ");

console.log(ans)
