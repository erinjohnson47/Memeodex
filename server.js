const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session')
const app = express();
const logger = require('morgan');

require('./db/db');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(session({
    secret: 'potato rolodex happy bark bark', 
    resave: false, 
    saveUninitialized: false
}));

app.listen(3000, () => {
    console.log('listening on port 3000')
});