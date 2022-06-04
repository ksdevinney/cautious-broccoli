const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');

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
// app.engine('hbs', exphbs( {extname: '.hbs'}));
// app.set('view engine', 'hbs');
const handlebars = exphbs.create({ extname: '.hbs' });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

// connection pool
// const pool = mysql.createPool({
//     connectionLimit : 100,
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME
// });
// moved to userController

// connect to db
// pool.getConnection((err, connection) => {
//     if(err) throw err; // not connected
//     console.log('Connected to DB' + connection.threadId);
// })

const routes = require('./server/routes/user');
app.use('/', routes);

app.listen(port, () => console.log(`listening on port ${port}`));