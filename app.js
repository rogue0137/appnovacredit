const express = require('express'); // the module
const app = express();
const path = require('path');
const formidableMiddleware = require('express-formidable');
const indexRouter = require('./routes/index');
const fileRouter = require('./routes/file');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// For files in forms
app.use(formidableMiddleware({uploadDir: './public'}));


app.use('/', indexRouter);
app.use('/files',fileRouter);

module.exports = app;