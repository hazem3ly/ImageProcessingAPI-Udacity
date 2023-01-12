import sharp from 'sharp';

export async function resizeImage(
	imagePath: string,
	widht: number,
	height: number,
	outputPath: string
): Promise<string> {
	await sharp(imagePath).resize(widht, height).toFile(outputPath);
	return outputPath;
}
