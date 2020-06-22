var express = require('express')
var router = express.Router()
const Score = require('../models/Score')

// GET ALL
router.get('/', async (req, res) => {
  try {
    const scores = await Score.find()
    res.json(scores)
  } catch (err) {
    res.json({
      message: err
    })
  }
})

// POST
router.post('/', async (req, res) => {
  try {
    const score = await Score.findOneAndUpdate(
      {
        gameId: req.body.gameId,
        userId: req.body.userId
      },
      {
          $set: {
            gameId: req.body.gameId,
            userId: req.body.userId,
            value: req.body.value
          }
      },
      {
        upsert: true, // insert the document if it does not exist
        new: true
      }
    )
    res.json(score);
  } catch (err) {
    console.warn(err)
    res.json({
      message: err
    })
  }
})

// GET ONE
router.get('/:scoreId', async (req, res) => {
  try {
    const score = await Score.findById(req.params.scoreId)
    res.json(score);
  } catch (err) {
    console.warn(err)
    res.json({
      message: err
    })
  }
})

// GET ONE
router.get('/:gameId/:userId', async (req, res) => {
  try {
    const score = await Score.findOne({
      gameId: req.params.gameId,
      userId: req.params.userId
    })
    res.json(score);
  } catch (err) {
    console.warn(err)
    res.json({
      message: err
    })
  }
})

// DELETE
router.delete('/:scoreId', async (req, res) => {
  try {
    const removedScore = await Score.remove({
      _id: req.params.scoreId
    });
    res.json(removedScore)
  } catch (err) {
    res.json({
      message: err
    })
  }
})

// UPDATE
router.patch('/:scoreId', async (req, res) => {
  try {
    const updatedScore = await Score.updateOne({
      _id: req.params.scoreId
    }, {
      $set: {
        value: req.body.value,
        userId: req.body.userId,
        gameId: req.body.gameId
      }
    })
    res.json(updatedScore);
  } catch (err) {
    res.json({
      message: err
    })
  }
})

module.exports = router;
