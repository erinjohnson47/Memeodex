const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    username: {type: String, unique: true, required: true, lowercase: true},
    password: {type: String, required: true},
    email: {type: String, required: true, lowercase: true, unique: true},
    dob: {type: String, required: true},
})

const User = mongoose.model('User', userSchema);

module.exports = User;
