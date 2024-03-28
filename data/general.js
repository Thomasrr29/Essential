const express = require('express');
const body_parser = require('body-parser');
const routes = require('./routes/routes');
const connection = require('./config/connection');
const cors = require('cors');

const corsOptions = {
  methods: ['GET', 'POST', 'PUT', 'DELETE']
};

connection()

const app = express();
const port = 3000;

app.use(body_parser.json());
app.use(express.urlencoded({ extended: false}));
app.use(cors(corsOptions));
app.use('/', routes);

app.listen(port, () =>  console.log(`Listenin on port ${port}`));