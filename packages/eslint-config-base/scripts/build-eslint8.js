import fs from 'node:fs/promises';
import config from '../legacy.js';

await fs.writeFile('.eslintrc.json', JSON.stringify(config, null, 2));
