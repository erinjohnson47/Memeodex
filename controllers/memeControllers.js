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
            if (req.body.tag.includes(',')) { 
                req.body.tag = req.body.tag.split(',') 
            }
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
                user: foundUser,
            })
        } catch(err){
            res.send(err)
        }
    },
    edit: async (req, res) => {
        // const checkUser = await Meme.findById({_id: req.params.id});
        // console.log(checkUser.user, '<checkUser.user', req.session.userId, '<-req.session.userId')
        // if(checkUser.user.toString() === req.session.userId.toString()){
            try {
                const foundMeme = await Meme.findById(req.params.id)
                res.render('memes/edit.ejs', {
                    meme: foundMeme,
            });
            } catch(err) {
                res.send(err)
            }
        // } else {
        //     req.session.message = 'Sorry, you do not have permission to edit this meme.';
        //     res.redirect(`/memes/${updateMeme._id}`);
        // }
    },
    update: async (req, res) => {
        console.log(req.body, '<-req.body',req.body.isVideo, '<-req.body.isVideo', req.body.urlMeme, '<-req.body.urlMeme', req.body.tag, '<-req.body.tag')
        if(req.body.isVideo === 'on') {
            req.body.isVideo = true;
            req.body.urlMeme = req.body.urlMeme.split('watch?v=').join('embed/')
        }
        if (req.body.tag.includes(',')) { 
            req.body.tag = req.body.tag.split(',') 
        }
        try {
            const updateMeme = await Meme.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
            res.redirect(`memes/${updateMeme}`, {
                meme: updateMeme
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