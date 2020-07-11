/**
 * Authentication Routes
 */

const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

router.get('/google/done', passport.authenticate('google', {
  failureRedirect: '/login'}),
  (req, res) => {
    res.json(req.user);
  });

module.exports = router;