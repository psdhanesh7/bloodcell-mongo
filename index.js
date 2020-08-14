const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport')
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('./models/User');
require('./models/Hospital');
require('./models/Donor');
require('./models/Requirement');
require('./services/passport');

const keys = require('./config/keys');
const authRoutes = require('./routes/authRoutes');
const requirementRoutes = require('./routes/requirementRoutes');
const donorRoutes = require('./routes/donorRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');

mongoose.connect(keys.mongoURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("DATABASE: Connection to database successful!"))
    .catch(err => console.log("DATABASE: " + err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(cookieParser());
app.use(session({ 
    secret: 'this is really an awesome secret', 
    resave: false, saveUninitialized: false 
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/requirement', requirementRoutes);
app.use('/donor', donorRoutes);
app.use('/hospital', hospitalRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
    if(err) console.log(err);
    console.log(`Listening to port ${PORT}`);
});