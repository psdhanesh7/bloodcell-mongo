const express = require('express');
const mongoose = require('mongoose');
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
app.use(passport.initialize());

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
    if(err) console.log(err);
    console.log(`Listening to port ${PORT}`);
});