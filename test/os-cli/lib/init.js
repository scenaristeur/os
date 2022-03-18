import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export async function init (config) {

console.log("init", config)
};
