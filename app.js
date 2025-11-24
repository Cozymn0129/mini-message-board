const express = require('express');
const app = express();

const indexRouter = require('./routes/index');

const expressLayouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use(expressLayouts);
app.set('layout', 'layout');

app.use('/', indexRouter);
