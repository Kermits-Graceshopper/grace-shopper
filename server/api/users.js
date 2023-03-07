const router = require('express').Router()
const { Users } = require('../db')


// TODO: make auth middle ware that checks if user is an admin, do refresh tokens come into play here??
router.get('/all', async (req, res, next) => {
  try {
    const users = await Users.findAll({
      attributes: ['fullName', 'fname', 'lname', 'email', 'isAdmin', 'isLoggedIn']
    })
    res.send(users)
  } catch (err) {
    next(err)
  }
});

//make route with same middleware that can delete a user
router.delete('/all/:userId', (req, res) => {
  try{
    
  } catch(e){

  }
})

module.exports = router