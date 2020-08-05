const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({username : username});
            
            if(!user) return done(null, false, { message : "Incorrect username or password"});
            console.log(user);
        } catch(err) {
            return done(err);
        }
    }
));