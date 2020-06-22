var express = require('express')
var router = express.Router()
const Lesson = require('../models/Lesson')
// const Score = require('../models/Score')
// const verifyToken = require('./verifyToken')

// GET ALL
router.get('/' , async (req, res) => {
  try {
    const lessons = await Lesson.find()
    res.json(lessons)
  } catch(err) {
    res.json({ message: err })
  }
})

// POST
router.post('/', async (req, res) => {
  const lesson = new Lesson({
    title: req.body.title,
    description: req.body.description,
    slug: req.body.slug,
    content: req.body.content
  });

  try {
    const savedLesson = await lesson.save()
    res.json(savedLesson)
  } catch (err) {
    // console.log(err)
    res.json({ message: err })
  }
})

// // GET ONE
// router.get('/:lessonId', async (req, res) => {
//   try {
//     const lesson = await Lesson.findById(req.params.lessonId)
//     res.json(lesson);
//   } catch (err) {
//     console.warn(err)
//     res.json({ message: err })
//   }
// })

// GET ONE BY SLUG
router.get('/:slug', async (req, res) => {
  try {
    const lesson = await Lesson.findOne({
      slug: req.params.slug
    })
    res.json(lesson);
  } catch (err) {
    console.log(err)
    res.json({
      message: err
    })
  }
})

// DELETE
router.delete('/:slug', async (req, res) => {
  try {
    const removedLesson = await Lesson.remove({ slug: req.params.slug });
    res.json(removedLesson)
  } catch (err) {
    res.json({ message: err })
  }
})

// UPDATE
router.put('/:slug', async (req, res) => {
  try {
    const updatedLesson = await Lesson.updateOne(
      { slug: req.params.slug },
      {
        $set: req.body 
      }
    )
    res.json(updatedLesson);
  } catch (err) {
    console.log(err)
    res.json({ message: err })
  }
})

module.exports = router;
