const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// router
// render home page
app.get('', (req, res) => {
    res.render('home');
});

module.exports = router;