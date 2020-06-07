const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');


// router.get('/reg', (req, res) => {
//   res.send('Registration Page');
// });

router.post('/reg', (req, res) => {
  let newUser = new User({
    login: req.body.login,
    email: req.body.email,
    password: req.body.password
  });

  User.addNewUserToDB(newUser, (err, user) => {
    if (err)
      res.json({success: false, message: "User not be added to DataBase"});
    else
      res.json({success: true, message: "User successfuly added to DataBase"});
  });
});

router.post('/auth', (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  User.getUserByLogin(login, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({success: false, message: "User not founded"});
    }

    User.comparePassword(password, user.password, (err, isEqual) => {
      if (err) throw err;
      if (!isEqual) {
        return res.json({success: false, message: "Passwords don't match"});
      }

      const token = jwt.sign(user.toJSON(), config.sercretKey, {
        expiresIn: 3600*24
      });

      res.json({
        success: true,
        token: 'JWT ' + token,
        user: {
          id: user._id,
          login: user.login,
          email: user.email
        }
      });
    });
  });
});

router.get('/dashboard', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.send('Dashboard Page');
});

module.exports = router;
