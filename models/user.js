const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dbConfig = require('../config/db');

const UserSchema = mongoose.Schema({
  login: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('UserSchema', UserSchema);


module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
};

module.exports.getUserByLogin = function (login, callback) {
  const query = {login: login};
  User.findOne(query, callback);
};

module.exports.addNewUserToDB = function (newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.comparePassword = function (password, dbPassword, callback) {
  bcrypt.compare(password, dbPassword, (err, isEqual) => {
    if (err) throw err;
    callback(null, isEqual);
  });
};
