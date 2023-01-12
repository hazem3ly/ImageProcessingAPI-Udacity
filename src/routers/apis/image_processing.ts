import express, { Request, Response } from 'express';
import quaryValidator from '../../middlewares/quary_validation';
import {
	checkImageExist,
	getImageOutputPath,
	readImageFile,
} from '../../utils/files_utils';
import { resizeImage } from '../../utils/images';

const apiRoutes = express.Router();

apiRoutes.get('/', quaryValidator, async (req: Request, res: Response) => {
	const imageName = req.query.imageName as string;
	const width = Number(req.query.width);
	const height = Number(req.query.height);

	// first check image exist
	const imagePAth = checkImageExist(imageName);
	if (!imagePAth) {
		res.status(404).send('This image not found');
		return;
	}

	// second we generate output folder/file to save to
	const outputPath = getImageOutputPath(imageName);

	// third we resize image
	const outputPathResized = await resizeImage(imagePAth, width, height, outputPath);

	// forth we read resized image
	const image = await readImageFile(outputPathResized);

	// five we return image to response
	res.end(image);
});

export default apiRoutes;
