const mongoose = require('mongoose')

const ScoreModel = mongoose.Schema({
  value: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  gameId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Scores', ScoreModel)
