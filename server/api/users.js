const router = require('express').Router()
const { Users } = require('../db')


// "/users" will already be mounted on this router so "/" here will really be "/users"

router.get('/', async (req, res, next) => {
  try {
    const users = await Users.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
module.exports = router