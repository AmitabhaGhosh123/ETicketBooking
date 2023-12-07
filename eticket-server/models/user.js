const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    userName: String,
    password: String,
    confirmPassword: String,
    role: String
});
module.exports = mongoose.model('user',userSchema, 'users');