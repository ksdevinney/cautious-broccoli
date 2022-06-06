const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// create, find, update, delete

router.get('/', userController.view);

// router
// render home page
// app.get('', (req, res) => {
//     res.render('home');
// });

module.exports = router;