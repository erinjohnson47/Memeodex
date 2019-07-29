const mongoose = require('mongoose');
const User = require('../models/User');
const Meme = require('../models/Meme');


const memeController = {
    index: async (req, res) =>{
        try {
            const allMeme = await Meme.find({})
            res.render('memes/index.ejs', {
                memes: allMeme
            })

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
    },
    create: async (req, res) => {
        console.log(req.body)
        try {
            const createMeme = await Meme.create(req.body);
            res.redirect('memes/')
        } catch(err) {
            res.send(err)
        }
    },
    meme: async (req, res) => {
        try {
            const foundMeme = await Meme.findById(req.params.id)
            res.render('memes/show.ejs', {
                meme: foundMeme
            })
        } catch(err){
            res.send(err)
        }
    },
    edit: async (req, res) => {
        try {
            const foundMeme = await Meme.findById(req.params.id)
            res.render('memes/edit.ejs', {
                meme: foundMeme
        });
        } catch(err) {
            res.send(err)
        }
    },
    update: async (req, res) => {
        try {
            const foundMeme = await Meme.findById(req.params.id)
            res.render('memes/edit.ejs', {
                meme: foundMeme
        });
        } catch(err) {
            res.send(err)
        }
    },
    delete: async(req,res) => {
        try {
          const foundMeme = await Meme.findByIdAndRemove(req.params.id);
          res.redirect('/memes')
        } catch(err) {
          res.send(err)
        }
    }
}

module.exports = memeController;