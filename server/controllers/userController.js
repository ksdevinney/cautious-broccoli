const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  // host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});
// apparently wrong info for database...

// view users
exports.view = (req, res) => {
  connection.query('SELECT * FROM user WHERE status = "active"', 
  (err, rows) => {
    if (!err) {
      let removedUser = req.query.removed;
      res.render('home', { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log("Data from user table: \n", rows);
  });
};

// user search
exports.find = (req, res) => {

  let SearchTerm = req.body.search;

  connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?', [
    '%' + SearchTerm + '%', '%' + SearchTerm + '%'
  ],
  (err, rows) => {
    if (!err) {
      res.render('home', { rows });
    } else {
      console.log(err)
    }
    console.log('the data from the search results: \n', rows);
  });

}