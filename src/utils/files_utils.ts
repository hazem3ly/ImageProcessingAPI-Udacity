import fs, { promises as fsPromises } from 'fs';

export function checkImageExist(imageName: string): string | null {
    // if building ts
    if (fs.existsSync('assets/' + imageName + '.jpg')) {
        return 'assets/' + imageName + '.jpg';
    }
    // if building js from dist folder
    if (fs.existsSync('../assets/' + imageName + '.jpg')) {
        return '../assets/' + imageName + '.jpg';
    }
    return null;
}

export function getImageOutputPath(imageName: string, width: number, height: number): string {
    if (!fs.existsSync('.generated')) {
        fs.mkdirSync('.generated');
    }
    return ('.generated/' + imageName + '-' + width + '-' + height + '.jpg');
}

export function isImageResizedBefore(imageName: string, width: number, height: number): boolean {
    return fs.existsSync('.generated/' + imageName + '-' + width + '-' + height + '.jpg');
}

export async function readImageFile(
    filePath: string
): Promise<Buffer | string> {
    try {
        const myFile = await fsPromises.readFile(filePath);
        return myFile;
    } catch (err) {
        return 'Couldn\'t read file :' + filePath;
    }
}
