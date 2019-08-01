const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session')
const app = express();
const logger = require('morgan');
const userRoutes = require('./routers/userRoutes')
const memeRoutes = require('./routers/memeRoutes')
const Meme = require('./models/Meme')


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(logger('dev'));
app.use(session({
    secret: 'potato rolodex happy bark bark', 
    resave: false, 
    saveUninitialized: false
}));

require('dotenv').config();
const PORT = process.env.PORT;
// const PORT = 3000;
require('./db/db');

app.use('/users', userRoutes);
app.use('/memes', memeRoutes);

app.get('/', async (req, res) => {
    const findMemes = await Meme.find({});
    res.render('home.ejs', {
        message: req.session.message,
        isLogged: req.session.logged,
        userId: req.session.userId,
        memes: findMemes
    })
    console.log(findMemes, '<-findMemes in home route')
    console.log(req.session.logged)
})
app.get('/about', (req, res) => {
    res.render('about.ejs', {
        message: req.session.message,
        isLogged: req.session.logged,
        userId: req.session.userId,
    })
    console.log(req.session.message)
})

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.send(err)
    } else {
        res.redirect('/')
    }
    })
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});