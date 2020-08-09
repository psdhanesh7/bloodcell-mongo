const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

require('../services/passport')(passport);
const { unauthenticatedOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', unauthenticatedOnly, async (req, res) => {

    const { email, password } = req.body;
    if(!email || !password) return res.json({success: false, message: 'Email or password not entered'});

    try {
        const user = new User({ email: email, password: password });
        await user.save();

        res.json({success: true, message: 'User created succesfully'});
    } catch(err) {
        return res.status(422).send(err.message);
    }
});

router.post('/login', unauthenticatedOnly, 
    passport.authenticate('local', 
        { 
            failureRedirect: '/auth/login', 
            successRedirect: '/dashboard' 
        }
    )
);

router.get('/logout', (req, res) => {
    req.logout();
    res.json({ success: true, message: 'Logout successful' });
});

module.exports = router;