import express from "express";
var router = express.Router();
import passport from "passport";


/**
 * Auth Login
 */
router.get('/login', (req, res) => {
    res.send("display login in view");
});
/**
 * Auth Logout
 */
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

/**
 * Callback route for google to redirect to
 */
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    //res.send(req.user);
    res.redirect('/user/profile');
})

export default router;