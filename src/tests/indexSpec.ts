import supertest from 'supertest';
import { app } from '../index';
import fs from 'fs';
import { checkImageExist, getImageOutputPath } from '../utils/files_utils';
import { resizeImage } from '../utils/images';
const request = supertest(app);

describe('Test endpoint responses', async () => {
    it('gets the api endpoint', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });

    it('api get called without quary imageName', async () => {
        const response = await request.get('/api');
        expect(response.status).toBe(400);
    });

    it('api get called without quary imageName return error message', async () => {
        const response = await request.get('/api');
        expect(response.body).toEqual({
            'message': 'imageName Must Exists'
        });
    });

    it('api get called without quary width', async () => {
        const response = await request.get('/api?imageName=encenadaport');
        expect(response.status).toBe(400);
    });

    it('api get called with correct quary', async () => {
        const response = await request.get('/api?imageName=encenadaport&width=100&height=100');
        expect(response.status).toBe(200);
    });


    it('check resizing image create new file', async () => {
        let file = getImageOutputPath('encenadaport', 100, 100);
        if (fs.existsSync(file)) {
            fs.unlinkSync(file)
        }
        let result = await resizeImage(checkImageExist('encenadaport')!, 100, 100, file);
        expect(fs.existsSync(result)).toBeTrue();
    });


});