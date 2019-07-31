const mongoose = require('mongoose');
const User = require('../models/User');
const Meme = require('../models/Meme');
const bcrypt = require('bcryptjs')

const userController = {
    index: async (req, res) => {
        try {
            const foundUsers = await User.find({});
            res.render('users/index.ejs', {
                users: foundUsers
            })
        } catch (err) {
            res.send(err);
        }
    },
    register: (req, res) => {
        res.render('users/register.ejs', {
            message: req.session.message,
            image: req.session.image
        })
    },
    create: async (req, res) => {
        const foundUsername = await User.findOne({username: req.body.username});
        const foundEmail = await User.findOne({email: req.body.email});
            if (foundUsername) {
                req.session.message = 'The username you selected is already in use, please select another.'
                req.session.image = 'https://i.kym-cdn.com/entries/icons/original/000/014/285/sideeyechloe.jpg'
                res.redirect('users/register')
            } else if (foundEmail) {
                req.session.message = 'There is already an account registered with that email address.';
                req.session.image = 'https://i.kym-cdn.com/entries/icons/original/000/014/285/sideeyechloe.jpg'
                res.redirect('users/register')
            } else {
                const password = req.body.password;
                const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
                req.body.password = hashedPassword;
                try {
                    const createdUser = await User.create(req.body);
                    console.log(createdUser, '<-createdUser');
                    req.session.userId = createdUser._id;
                    req.session.username = createdUser.username;
                    req.session.logged = true;
                    console.log(createdUser._id, '<-createdUser._id')
                    res.redirect(`users/${createdUser._id}`)
                } catch (err) {
                    res.send(err);
                }
            }
    },
    login: async (req, res) => {
            try {
                const foundUser = await User.findOne({username: req.body.username});
                if(foundUser) {
                    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                        req.session.userId = foundUser._id;
                        req.session.username = foundUser.username;
                        req.session.logged = true; 
                        res.redirect(`/users/${foundUser._id}`); 
                    } else {
                        req.session.message = 'Username or Password is incorrect.';
                        res.redirect('/');
                    } 
                } else { 
                    req.session.message = 'Username or Password is incorrect.';
                    res.redirect('/');
                }
            } catch (err) {
                console.log(err)
                res.send(err)
            } 
    },
    edit: async (req, res) => {
        const findUser = await User.findOne({_id:req.params.id});
        if (findUser._id.toString() === req.session.userId.toString()){
            try {
                const findUser = await User.findOne({_id:req.params.id});
                const findMemes = await Meme.find({username: req.params.id});
                const [foundUser, foundMemes] = await Promise.all([findUser,findMemes]);
                res.render('users/edit.ejs', {
                    user: foundUser,
                    memes: foundMemes
                });
            } catch (err) {
                res.send(err);
            }
        } else {
            req.session.message = 'Sorry, you do not have permission to edit this profile.';
            res.redirect(`/users/${findUser._id}`);
            }
    },
    delete: async (req, res) => {
        const findUser = await User.findOne({_id:req.params.id});
        if (findUser._id.toString() === req.session.userId.toString()){
            try {
                const deleteUser = await User.findOneAndRemove({_id:req.params.id});
                const deleteMemes = await Meme.remove({user: req.params.id})
                const [deletedUser, deletedMemes] = await Promise.all([deleteUser, deleteMemes]);
                req.session.destroy();                
                res.redirect('/');
            } catch (err) {
                res.send(err);
            }
        } else {
            req.session.message = 'You do not have permission to delete this profile.';
            res.redirect(`/users/${findUser._id}`);
        }
    },
    update: async (req, res) => {
        const findUser = await User.findOne({_id:req.params.id});
            if (findUser._id.toString() === req.session.userId.toString()){
                try {
                    if (!req.body.password) {
                        delete req.body.password
                    } else {
                        const password = req.body.password;
                        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
                        req.body.password = hashedPassword;
                    }
                    const updateUser = await User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
                    res.redirect(`/users/${updateUser._id}`)
                } catch (err) {
                    res.send(err)
                } 
        } else {
            req.session.message = 'Sorry, you do not have permission to edit this profile.';
            res.redirect('/');
            }
    },
    profile: async (req, res) => {
            try {
                const findUser = await User.findOne({_id:req.params.id});
                console.log(findUser, 'foundUser in show/profile route');
                const findMemes = await Meme.find({user: req.params.id});
                console.log(findMemes, '<-findMemes in profile route');
                const [foundUser, foundMemes] = await Promise.all([findUser,findMemes]);
                console.log(req.session, "this is the session")
                res.render('users/show.ejs', {
                    user: foundUser,
                    memes: foundMemes,
                    userId: req.session.userId,
                });
            } catch (err) {
                console.log(err);
                res.send(err);
            }
    }
}

module.exports = userController;