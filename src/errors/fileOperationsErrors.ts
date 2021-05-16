export default class FileOperationsErrors extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'FileOperationsErrors';
    }
}