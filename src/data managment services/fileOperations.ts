import { promises } from 'fs';
import * as fs from 'fs';

export let readFile = async (path: string): Promise<string> => {
    if (fs.existsSync(path)) {
        const data = await promises.readFile(path, 'utf8');
        return data;
    }
    else {
        return Promise.reject('File does not exist');
    }
}

export let writeFile = async (path: string, data: string): Promise<void> => {
    try {
        await promises.writeFile(path, data, 'utf8');
    }
    catch (err) {
        console.log(err);
        return Promise.reject('Could not write data');
    }
}
