const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Employee = new Schema({
fullName: String,
phone: Number
});

module.exports = mongoose.model('employees', Employee);