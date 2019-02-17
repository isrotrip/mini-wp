const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const verifyUser = require('./middlewares/verifyUser.js');
const userRoute = require('./routes/userRoute.js');
const articleRoute = require('./routes/articleRoute.js');
const uploadRoute = require('./routes/uploadRoute.js');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
const database = 'mini-wordpress-isro';
const urlDatabase = `mongodb://localhost:27017/${database}`;
mongoose.connect(urlDatabase, {useNewUrlParser: true});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', userRoute);
app.use('/articles', verifyUser.authentication);
app.use('/articles', articleRoute);
app.use('/upload', uploadRoute);

module.exports = app;