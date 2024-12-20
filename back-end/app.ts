import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { userRouter } from './controller/user.routes';
import { animalRouter } from './controller/animal.routes';
import { expressjwt } from 'express-jwt';
import { workspaceRouter } from './controller/workspace.routes';
import { wageRouter } from './controller/wages.routes';


const app = express();
dotenv.config();


const port = Number(process.env.APP_PORT) || 3000;

if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined in environment variables.');
    process.exit(1); 
}


app.use(
    expressjwt({
        secret: process.env.JWT_SECRET,
        algorithms: ['HS256'],
    }).unless({
        path: ['/api-docs', /^\/api-docs\/.*/, '/users/login', '/login', '/users/signup'],
    })
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'unauthorized', message: err.message });
    } else if (err.name === 'CoursesError') {
        res.status(400).json({ status: 'domain error', message: err.message });
    } else {
        res.status(400).json({ status: 'application error', message: err.message });
    }
});

app.use(cors({ origin: 'http://localhost:8080' }));
app.use(express.json());

app.get('/status', (req, res) => {
    res.json({ message: 'Backend is running...' });
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Project API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));




app.use('/users', userRouter);
app.use('/animals', animalRouter);
app.use('/workspaces', workspaceRouter);
app.use('/wages', wageRouter);



app.listen(port, () => {
    console.log(`Backend is running on port ${port}.`);
});

export default app;
