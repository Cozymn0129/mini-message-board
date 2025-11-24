const express = require('express');
const router = require('./routes');

const app = express();
const port = 8080;

// template engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

app.set('layout', 'layout');

app.use('/', router);

app.get('/hello', (req, res) => res.send('Hello, Sho!'));
app.get('/status', (req, res) => res.json({ status: 'ok', server: 'running' }));
app.get('/items', (req, res) => res.json([
    { id: 1, name: 'apple' },
    { id: 2, name: 'banana' },
    { id: 3, name: 'carrot' }
]));

// 404 fallback
app.use((req, res) => res.status(404).send('Not Found'));

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
