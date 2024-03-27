const express = require('express');
const body_parser = require('body-parser');
const routes = require('./routes/routes');
const connection = require('./config/connection');
const cors = require('cors');

connection()

const app = express();
const port = 3000;

app.use(body_parser.json());
app.use(express.urlencoded({ extended: false}));
app.use(cors());
app.use('/', routes);

app.listen(port, () =>  console.log(`Listenin on port ${port}`));