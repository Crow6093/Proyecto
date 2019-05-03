'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
  email:{ type: String, unique: true },
  name: String,
  password: String
});

module.exports = mongoose.model('User',UserSchema);

