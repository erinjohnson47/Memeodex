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
            if(req.body.isVideo === 'on') {
                req.body.isVideo = true;
                req.body.urlMeme = req.body.urlMeme.split('watch?v=').join('embed/')
            }
            console.log(req.body, "<-----req.body here")
            const createMeme = await Meme.create(req.body);
            const user = await User.findById(req.session.userId);
            createMeme.user = user.id;
            createMeme.save();
            console.log(createMeme.user, '<-createMeme.user in create meme', req.body, '<-req.body in create route')
        // req.body.username = req.session.username
            res.redirect(`/users/${user.id}`)
        } catch(err) {
            console.log(err)
            res.send(err)
        }
    },
    meme: async (req, res) => {
        try {
            const foundMeme = await Meme.findById(req.params.id).populate('user');
            console.log(req.params.id, '<-req.params.id in show route')
            const foundUser = await User.findById(foundMeme.user);
            console.log(foundMeme, '<-foundMeme in show route')
            res.render('memes/show.ejs', {
                meme: foundMeme,
                user: foundUser
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