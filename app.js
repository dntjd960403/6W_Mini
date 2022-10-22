const express = require('express');
const Http = require('http');
const routes = require('./routes');
var cors = require('cors');
require('dotenv').config();

const app = express();
const http = Http.createServer(app);
const port = process.env.EXPRESS_PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', routes);
app.use(cors());

http.listen(port, () => {
  console.log(`Start listen Server: ${port}`);
});

module.exports = http;
