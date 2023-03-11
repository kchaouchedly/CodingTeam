const express = require('express');
const logger =require ('morgan');
const contactsRouter = require('./routes/contacts.js');
const app = express();
const createError = require('http-errors');
const dbConfig = require('./database/mongodb.json');
const mongoose =require('mongoose');
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false }));

app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
  useTempFiles: true
}))

app.use('/contact',contactsRouter);
app.use('/api', require('./routes/upload'))

app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/productRouter'))


mongoose.connect(dbConfig.mongo.uri)
module.exports = app;