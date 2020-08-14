module.exports = {

    authenticatedOnly : (req, res, next) => {
        console.log(req.isAuthenticated());
        console.log(req.user);
        if(req.isAuthenticated()) return next();
        // res.redirect('/auth/login');
        res.send({ message: 'You are not logged in' });
    },

    unauthenticatedOnly: (req, res, next) => {
        // const { email, password } = req.body;
        // console.log(email, password);
        // console.log(req.isAuthenticated());
        if(!req.isAuthenticated()) return next();
        // res.redirect('/dashboard');
        res.send({ success: false, message: 'You are logged in' });
    }
}