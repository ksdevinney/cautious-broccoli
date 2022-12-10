const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});
// apparently wrong info for database...
// or mysql isn't installed...how???

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

};

// add new user
exports.form = (req, res) => {
  res.render('add-user');
}

// add new user?
exports.create = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;

  // Use the connection
  connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?', [first_name, last_name, email, phone, comments], (err, rows) => {
    if (!err) {
      res.render('add-user', { alert: 'User added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}

// edit user record
exports.edit = (req, res) => {
  connection.query('SELECT * FROM user WHERE id = ?',
    [req.params.id], (err, rows) => {
      if (!err) {
        res.render('edit-user', { rows });
      } else {
        console.log(err);
      }
      console.log('The data from the table: \n', rows);
    })
}

// update user
exports.update = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;

  connection.query('UPDATE user set first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?',
    [first_name, last_name, email, phone, comments, req.params.id], (err, rows) => {
      if (!err) {
        // display the form, still filled out for the user
        connection.query('SELECT * FROM user WHERE id = ?',
          [req.params.id], (err, rows) => {
            if (!err) {
              res.render('edit-user', { rows, alert: `${first_name} has been updated.` });
            } else {
              console.log(err);
            }
            console.log('data updated');
          });
      } else {
        console.log(err);
      }
      console.log('The data from the table: \n', rows);
    })
}

// delete user
exports.delete = (req, res) => {
  connection.query('DELETE FROM user WHERE id = ?',
  [req.params.id], (err, rows) => {
    if(!err) {
      let removedUser = encodeURIComponent('User removed.');
      res.redirect('/?removed=' + removedUser);
    } else {
      console.log(err);
    }
    console.log('data: \n', rows);
  });
}

// view all
exports.viewall = (req, res) => {

  connection.query('SELECT * FROM user WHERE id = ?',
  [req.params.id], (err, rows) => {
    if (!err) {
      res.render('view-user', {rows});
    } else {
      console.log(err);
    }
    console.log('The data: \n', rows);
  });
}