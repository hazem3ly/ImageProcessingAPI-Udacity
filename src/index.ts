import express from 'express';
import routes from './routers';

export const app = express();

const port = 5010;

app.use(routes);

app.listen(port, () => {
	console.log(`server started at http://localhost:${port}/api`);
});
