const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv/config')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())

// Import routes
let gamesRoutes = require('./routes/games')
let scoresRoutes = require('./routes/scores')
let usersRoutes = require('./routes/users')
let lessonsRoutes = require('./routes/lessons')
let authRoutes = require('./routes/auth')

// Middleware
app.use(express.json())
app.use('/games', gamesRoutes)
app.use('/users', usersRoutes)
app.use('/scores', scoresRoutes)
app.use('/lessons', lessonsRoutes)
app.use('/auth', authRoutes)

// Routes
app.get('/', (req, res) => {
  res.send('We are on home')
})

// Connect
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to the DB");
  }
);

app.listen(3000)
