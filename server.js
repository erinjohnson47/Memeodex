const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session')
const app = express();
const logger = require('morgan');
const userRoutes = require('./routers/userRoutes')
const memeRoutes = require('./routers/memeRoutes')

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

require('./db/db');

app.use('/users', userRoutes);
app.use('/memes', memeRoutes);

app.get('/', (req, res) => {
    res.render('home.ejs')
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

app.listen(3000, () => {
    console.log('listening on port 3000')
});