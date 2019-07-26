const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    dob: {type: String, required: true},
    meme: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meme'
    }],
    profileImg: String
})

const User = mongoose.model('User', userSchema);

module.exports = User;
