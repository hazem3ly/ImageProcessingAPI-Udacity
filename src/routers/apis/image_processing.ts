import express, { Request, Response } from 'express';
import quaryValidator from '../../middlewares/quary_validation';
import {
    checkImageExist,
    getImageOutputPath,
    isImageResizedBefore,
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

    let outputPathResized = getImageOutputPath(imageName, width, height);
    if (!isImageResizedBefore(imageName, width, height)) {
        console.log('resizing...')
        outputPathResized = await resizeImage(imagePAth, width, height, outputPathResized);
    }
    console.log('loading image')

    const image = await readImageFile(outputPathResized);

    //  we return image to response
    res.end(image);
});

export default apiRoutes;
