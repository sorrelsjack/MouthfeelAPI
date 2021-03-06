const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

const foods = require('./routes/foods.js');
const flavors = require('./routes/flavors.js');
const misc = require('./routes/misc.js');
const textures = require('./routes/textures.js');
const users = require('./routes/users.js');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/foods', foods);
app.use('/flavors', flavors);
app.use('/misc', misc);
app.use('/textures', textures);
app.use('/users', users);

app.listen(process.env.PORT || 8080);