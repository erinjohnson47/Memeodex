const mongoose = require('mongoose');
const User = require('../models/User');
const Meme = require('../models/Meme');
const bcrypt = require('bcryptjs')

const userController = {
    index: async (req, res) => {
        console.log('-------------------------')
        console.log(req.session, '<-user index session')
        console.log('--------------------------');
        if (req.session.logged === true) {
            req.session.username;
          }
        try {
        const foundUsers = await User.find({});
        console.log(foundUsers, '<-foundUsers index route');
        res.render('users/index.ejs', {
            users: foundUsers
        })
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    },
    register: (req, res) => {
            console.log('this is working')
            res.render('users/register.ejs')
    },
    create: async (req, res) => {
        const password = req.body.password;
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        console.log(hashedPassword, '<-hashed password');
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
            console.log(err);
            res.send(err);
        }
    },
    login: async (req, res) => {
        try {
            const foundUser = await User.findOne({username: req.body.username});
            console.log(foundUser, '<--foundUser at login route');
            if(foundUser) {
                if(bcrypt.compareSync(req.body.password, foundUser.password)) {
                    req.session.userId = foundUser._id;
                    req.session.username = foundUser.username;
                    req.session.logged = true; 
                    res.redirect(`/users/${foundUser._id}`); 
                } else {
                    // req.session.message = 'Username or Password incorrect';
                    res.redirect('/');
                } 
            } else { 
                // req.session.message = 'Username or Password incorrect';
                res.redirect('/');
            }
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    },
    profile: async (req, res) => {
        try {
            const findUser = await User.findOne({_id:req.params.id});
            console.log(findUser, 'foundUser in show/profile route');
            const findMemes = await Meme.find({username: req.params.id});
            console.log(findMemes, '<-findMemes in profile route');
            const [foundUser, foundMemes] = await Promise.all([findUser,findMemes]);
            res.render('users/show.ejs', {
                user: findUser
            });
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }
}

module.exports = userController;