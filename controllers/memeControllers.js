const mongoose = require('mongoose');
const User = require('../models/User');
const Meme = require('../models/Meme');


const memeController = {
    index: async (req, res) =>{
        try {
            const allMeme = await Meme.find({})
            res.render('memes/index.ejs', {
                memes: allMeme,
                isLogged: req.session.logged,
            })

        } catch(err) {
            res.send(err)
        }
    },
    new: async (req, res) => {
        try {
            res.render('memes/new.ejs', {
                isLogged: req.session.logged,
            })
        } catch(err) {
            res.send(err)
        }
    },
    create: async (req, res) => {
        if (req.body.tag.includes(',')) { 
            req.body.tag = req.body.tag.split(',') 
        }
        if(req.body.isVideo === 'on') {
            req.body.isVideo = true;
            if (req.body.urlMeme.includes('watch?v=')){
            req.body.urlMeme = req.body.urlMeme.split('watch?v=').join('embed/')
            } else if (req.body.urlMeme.includes('youtu.be')) {
                req.body.urlMeme = req.body.urlMeme.split('youtu.be').join('www.youtube.com/embed');
            }
        } 
        try {
            const createMeme = await Meme.create(req.body);
            const user = await User.findById(req.session.userId);
            createMeme.user = user.id;
            createMeme.save();
            res.redirect(`/users/${user.id}`)
        } catch(err) {
            res.send(err)
        }
    },
    meme: async (req, res) => {
        try {
            const foundMeme = await Meme.findById(req.params.id).populate('user');
            const foundUser = await User.findById(foundMeme.user);
            res.render('memes/show.ejs', {
                meme: foundMeme,
                user: foundUser,
                isLogged: req.session.logged,
            })
        } catch(err){
            res.send(err)
        }
    },
    edit: async (req, res) => {
        const findUser = await User.findOne({_id:req.params.id});
        if (findUser._id.toString() === req.session.userId.toString()){
            try {
                const foundMeme = await Meme.findById(req.params.id)
                res.render('memes/edit.ejs', {
                    meme: foundMeme,
                    isLogged: req.session.logged,
            });
            } catch(err) {
                res.send(err)
            }
        } else {
            req.session.message = 'Sorry, you do not have permission to edit this meme.';
            res.redirect(`/users/${findUser._id}`);
        }
    },
    update: async (req, res) => {
        if(req.body.isVideo && req.body.isVideo=== 'on') {
            req.body.isVideo = true;
            req.body.urlMeme = req.body.urlMeme.split('watch?v=').join('embed/')
        }
        if (req.body.tag.includes(',')) { 
            req.body.tag = req.body.tag.split(',') 
        }
        try {
            const updateMeme = await Meme.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
            res.redirect(`/memes/${updateMeme._id}`);
        } catch(err) {
            res.send(err)
        }
    },
    delete: async(req,res) => {
        const findUser = await User.findOne({_id:req.params.id});
            if (findUser._id.toString() === req.session.userId.toString()){
                try {
                const foundMeme = await Meme.findByIdAndRemove(req.params.id);
                res.redirect('/memes')
                } catch(err) {
                res.send(err)
                }
            } else {
                req.session.message = 'Sorry, you do not have permission to delete this meme.';
                res.redirect(`/users/${findUser._id}`);
            }
    }
}

module.exports = memeController;