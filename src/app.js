const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const layout = require('express-layout');
const cors = require('cors');

app.use(cors());
app.options('*', cors());

//Rotas
const index = require('./routes/index');
const personRoute = require('./routes/personRoute');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', index);
app.use('/person', personRoute);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const middleware = [
  layout(),
  express.static(path.join(__dirname, 'public')),
]
app.use(middleware)

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

module.exports = app;