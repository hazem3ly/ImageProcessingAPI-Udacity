import express from 'express';

const app = express();

const port = 5010;

app.get('/api', (req, res) => {
    res.send('Hello, world!');
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/api`)
});
