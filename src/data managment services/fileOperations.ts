import { promises } from 'fs';
import * as fs from 'fs';
import FileOperationsErrors from '../errors/fileOperationsErrors';

export let readFile = async (path: string): Promise<string> => {
    if (fs.existsSync(path)) {
        const data = await promises.readFile(path, 'utf8');
        return data;
    }
    else {
        throw new FileOperationsErrors('Data file does not exist');
    }
}

export let writeFile = async (path: string, data: string): Promise<void> => {
    await promises.writeFile(path, data, 'utf8');
}
