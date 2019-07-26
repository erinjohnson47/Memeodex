const mongoose = require('mongoose');
const User = require('../models/User');
const Meme = require('../models/Meme');
const bcrypt = require('bcryptjs')

const userController = {
    index: async (req, res) => {
        console.log('-------------------------')
        console.log(req.session, '<-user index session')
        console.log('--------------------------');
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
    register:(req, res) => {
            console.log('this is working')
            res.render('users/register.ejs')
    }
}

module.exports = userController;