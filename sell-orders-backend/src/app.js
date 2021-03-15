const express = require('express');
const cors = require('cors');
const routes = require('./routes');


const app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(express.json());

app.use(cors());
app.options('*', cors());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use('/', routes);


module.exports = app;