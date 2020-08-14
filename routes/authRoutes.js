const router = require('express').Router();
const passport = require('passport');
const User = require('mongoose').model('User');

require('../services/passport')(passport);
const { unauthenticatedOnly, authenticatedOnly } = require('../middlewares/authMiddleware');

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

router.post('/login', 
    unauthenticatedOnly, 
    passport.authenticate('local', {
        failureRedirect: '/auth/loginFailure'
    }),
    (req, res) => {
        return res.send({ success: true, user: req.user });
    }
);

router.get('/loginFailure', (req, res) => {
    res.json({ success: false, user: false, message: 'User login failed' });
})

router.get('/logout', (req, res) => {
    req.logout();
    res.json({ success: true, message: 'Logout successful' });
});

router.get('/currentUser', (req, res) => {
    res.send(req.user);
})

module.exports = router;