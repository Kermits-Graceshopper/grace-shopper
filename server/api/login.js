const { verifyJWT } = require('../controllers');

const router = require('express').Router();


// make login route (requires authorization)
router.post('/login', verifyJWT, (req, res) => {
    res.status(200).json({ fname: req.fname, lname: req.lname, email: req.email });
})


module.exports = router;