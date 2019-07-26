const mongoose = require('mongoose');
const User = require('../models/User');
const Meme = require('../models/Meme');


const memeController = {
    index: async (req, res) =>{
        try {
            res.render('memes/index.ejs')
        } catch(err) {
            res.send(err)
        }
    },
    new: async (req, res) => {
        try {
            res.render('memes/new.ejs')
        } catch(err) {
            res.send(err)
        }
    }






}

module.exports = memeController;