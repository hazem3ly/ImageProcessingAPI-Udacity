import express, { Request, Response } from 'express';
import apiRoutes from './apis/image_processing';

const routes = express.Router();

routes.get('/', (req: Request, res: Response) => {
	res.send('Image Prossing Server!');
});

routes.use('/api', apiRoutes);

export default routes;
