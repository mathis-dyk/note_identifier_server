var express = require('express')
var router = express.Router()
const Game = require('../models/Game')
const Score = require('../models/Score')
const verifyToken = require('./verifyToken')

// GET ALL
router.get('/' , async (req, res) => {
  try {
    const games = await Game.find()
    res.json(games)
  } catch(err) {
    res.json({ message: err })
  }
})

// POST
router.post('/', verifyToken, async (req, res) => {
  const game = new Game({
    title: req.body.title,
    description: req.body.description,
    slug: req.body.slug,
  });

  try {
    const savedGame = await game.save()
    res.json(savedGame)
  } catch (err) {
    res.json({ message: err })
  }
})

// GET ONE
router.get('/:gameId', async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId)
    res.json(game);
  } catch (err) {
    console.warn(err)
    res.json({ message: err })
  }
})

// GET ONE
router.get('/:gameId', async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId)
    res.json(game);
  } catch (err) {
    console.warn(err)
    res.json({
      message: err
    })
  }
})


// GET ONE BY SLUG
router.get('/:gameId/bestscore', async (req, res) => {
  try {
    const game = await Score.find({
      gameId: req.params.gameId
    }).sort({value: -1}).limit(1)
    res.json(game);
  } catch (err) {
    console.warn(err)
    res.json({
      message: err
    })
  }
})

// GET ONE BEST SCORE
router.get('/bestscores/:userId', async (req, res) => {
  try {
    const game = await Score.find({
      userId: req.params.userId
    })
    res.json(game);
  } catch (err) {
    console.warn(err)
    res.json({
      message: err
    })
  }
})

// DELETE
router.delete('/:gameId', async (req, res) => {
  try {
    const removedGame = await Game.remove({ _id: req.params.gameId });
    res.json(removedGame)
  } catch (err) {
    res.json({ message: err })
  }
})

// UPDATE
router.patch('/:gameId', async (req, res) => {
  try {
    const updatedGame = await Game.updateOne(
      { _id: req.params.gameId },
      {
        $set: req.body 
      }
    )
    res.json(updatedGame);
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router;
