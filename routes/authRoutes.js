const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const keys = require('../config/keys');
const passport = require('passport');
require('../services/passport')(passport);


const router = express.Router();

router.post('/signup', async (req, res) => {

    const { email, password } = req.body;
    if(!email || !password) return res.json({success: false, message: 'Email or password not entered'});

    try {
        const user = new User({ email: email, password: password, admin: true });
        await user.save();

        res.json({success: true, message: 'User created succesfully'});
    } catch(err) {
        return res.status(422).send(err.message);
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) return res.json({ success: false, message: 'Email or password missing' });

    try {
        const user = await User.findOne({ email: email} );
        if(!user) return res.json({ success: false, message: 'Email or password invalid'})

        user.comparePassword(password, (err, isMatch) => {
            if(err) return res.json({ success: false, message: err.message });
            if(!isMatch) return res.json({ success: false, message: 'Email or password invalid' });
            
            console.log(user);
            const token = jwt.sign({ id: user._id, admin: user.admin }, keys.jwtSecret);
            res.json({ success: true, token: token });
        });

       
    } catch(err) {
        return res.json({ success: true, message: err.message });
    }

});

router.get('/logout', passport.authenticate('jwt', {session: false }), function(req, res) {
    req.logout();
    res.json({ success: true, message: 'Logout successful' });
});

module.exports = router;