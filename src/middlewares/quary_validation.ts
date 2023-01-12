import { NextFunction, Request, Response } from 'express';

const quaryValidator = (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.query.imageName) {
			throw 'imageName Must Exists';
		}
		if (!req.query.width) {
			throw 'width Must Exists';
		}
		if (isNaN(Number(req.query.width))) {
			throw 'width Must Be Number';
		}
		if (!req.query.height) {
			throw 'height Must Exists';
		}
		if (isNaN(Number(req.query.height))) {
			throw 'height Must Be Number';
		}
		next();
	} catch (error) {
		res.status(400).send({
			message: error,
		});
	}
};

export default quaryValidator;
