require('rootpath')();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const paginationParams = require('./api/common/middleware');
// Get our API routes
const dashboard = require('./api/dashboard');
const auth = require('./api/auth');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'dist')));

app.use(paginationParams);

// Set our api routes
app.use('/api/dashboard', dashboard);
app.use('/api/auth', auth);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`API running on localhost:${port}`)
});
