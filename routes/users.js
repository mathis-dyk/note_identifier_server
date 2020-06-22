var express = require('express')
var router = express.Router()
const User = require('../models/User')

// GET ALL
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.json({
      message: err
    })
  }
})

// GET ONE
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    res.json(user);
  } catch (err) {
    console.warn(err)
    res.json({
      message: err
    })
  }
})

// DELETE
router.delete('/:userId', async (req, res) => {
  try {
    const removedUser = await User.remove({
      _id: req.params.userId
    });
    res.json(removedUser)
  } catch (err) {
    res.json({
      message: err
    })
  }
})

module.exports = router;
