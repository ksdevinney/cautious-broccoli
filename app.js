const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = rquire('mysql');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// parse json data from forms
// parse application/form
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// static files
app.use(express.static('public'));

// templating engine
// change file extension
app.engine('hbs', exphbs( {extname: '.hbs'}));
app.set('view engine', 'hbs');

app.listen(port, () => console.log(`listening on port ${port}`));