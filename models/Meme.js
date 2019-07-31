const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
    urlMeme: {type: String, required: true},
    title: {type: String, required: true},
    description: String,
    isVideo: Boolean,
    date: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tag: [String]
})

const Meme = mongoose.model('Meme', memeSchema);

module.exports = Meme;
