const express = require('express');
const userRoutes  = express.Router();
const User = require('../models/user');

userRoutes.get('/user', (req, res, next) => {
  res.render('user/user-page');
});


module.exports = userRoutes;