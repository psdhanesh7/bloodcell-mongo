const router = require('express').Router();
const passport = require('passport');
const User = require('mongoose').model('User');

require('../services/passport')(passport);
const { unauthenticatedOnly } = require('../middlewares/authMiddleware');

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
        failureRedirect: '/auth/loginFailure', 
        successRedirect: '/auth/loginSuccess' 
    })
);

router.get('/loginSuccess', (req, res) => {
    res.json({ success: true, message: 'User logged in succesfully'} );
})

router.get('loginFailure', (req, res) => {
    res.json({ success: false, message: 'User login failed' });
})

router.get('/logout', (req, res) => {
    req.logout();
    res.json({ success: true, message: 'Logout successful' });
});

module.exports = router;