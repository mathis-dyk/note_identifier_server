const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verifyToken = require('./verifyToken')
const {
  registerValidation,
  loginValidation
} = require('../validation')

router.post('/register', async (req, res) => {
  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send({
    err: error.details[0].message
  })

  const emailExist = await User.findOne({ email: req.body.email })
  if (emailExist) return res.status(409).send({
    err: 'Email already exists'
  })

  // Hash PW
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password, salt)

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    date: req.body.date,
    isAdmin: req.body.isAdmin || 0
  })

  try {
    const savedUser = await user.save()
    res.status(200).send({
      user: user._id
    })
  } catch (err) {
    res.status(400).send({
      err: err
     })
  }
})

router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send({
    err: error.details[0].message
  });

  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send({
    err: 'Email or password is wrong !'
  })

  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) return res.status(400).send({
    err: 'Email or password is wrong !'
  })

  const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.TOKEN_SECRET)
  const userId = user._id
  res.status(200).send({token, userId})
})

router.get('/me', verifyToken, async (req, res) => {
  const token = req.header('auth-token')
  var decoded = jwt.verify(token, process.env.TOKEN_SECRET);

  const user = await User.findOne({
    _id: decoded._id
  })
  if (!user) return res.status(400).send({
    err: 'There is no user with this id'
  })

  res.send(user)
})

module.exports = router
