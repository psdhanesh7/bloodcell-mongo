const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = new User({ email, password });
        await user.save();
    } catch(err) {
        return res.status(422).send(err.message);
    }

    res.send('You have made a post request to create a new user');
});

router.post('/login', (req, res) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
});

module.exports = router;