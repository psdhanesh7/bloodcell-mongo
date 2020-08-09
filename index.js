const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport')

require('./models/User');
require('./services/passport');


const keys = require('./config/keys');
const authRoutes = require('./routes/authRoutes');

mongoose.connect(keys.mongoURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("DATABASE: Connection to database successful!"))
    .catch(err => console.log("DATABASE: " + err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({ secret: 'this is really an awesome secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

// This section of code is to be removed
// -------------------------------------

const { authenticatedOnly } = require('./middlewares/authMiddleware');

app.get('/', (req, res) => {
    console.log(req.user);
    res.send(req.user);
})

app.get('/dashboard', authenticatedOnly, (req, res) => {
    console.log(req.user);
    res.send(req.user);
})

// -------------------------------------
// The section of code to be removed ends here

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
    if(err) console.log(err);
    console.log(`Listening to port ${PORT}`);
});