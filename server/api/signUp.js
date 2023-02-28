const { handleSignUp } = require('../controllers');

const router = require('express').Router();


// make sign up route (requires authentication)
router.post('/signup', handleSignUp);


module.exports = router;