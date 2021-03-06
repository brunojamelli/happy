import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import './database/connection';
import routes from './routes';
import path from 'path';

const app = express();
app.use(cors());

app.use(express.json());
app.use(routes);

app.use('/uploads',express.static(path.join(__dirname,'..', 'uploads')))

app.listen(3333);


