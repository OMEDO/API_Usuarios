import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes';
import dotenv from 'dotenv';
dotenv.config();
import swaggerUi from 'swagger-ui-express';
import specs from './documentation/swagger.config';


const app = express()

app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1', routes)

export default app