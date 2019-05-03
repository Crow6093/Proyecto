'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
  name: String,
  description: String,
  category: String,
  year: Number,
  langs: String,
  image: String,
  email: String,
  visibility:String,
  file: String,
  assessment: Number,
  NumberOfAssessments: Number,
  TotalAssessments: Number,
  VotedUser: Array,
});

module.exports = mongoose.model('project',ProjectSchema);
