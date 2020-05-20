import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const foods = require('./routes/foods.js');
const users = require('./routes/users.js');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/foods', foods);
app.use('/users', users);

app.listen(3000); // TODO: Delete when not testing locally