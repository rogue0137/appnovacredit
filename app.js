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
app.use(formidableMiddleware());


app.use('/', indexRouter);
app.use('/files',fileRouter);
// app for express application
// app can do the following
// app.METHOD (https)
// app.route (middleware)
// app.render (views)
// app.engine (template engine??)

// app.set(name, value)
// Retrieve the value of a setting with app.get()
// app.get(path, callback [, callback ...])
// app.post(path, callback [, callback ...])
// app.use([path,] callback [, callback...]) --> maps middleware function --> in Express 4+ this goes in bin/www unless it's static

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;