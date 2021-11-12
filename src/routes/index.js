const express = require('express') 
const router = express.Router() 
const book = require('./book') 
const word = require('./word')

router.use('/books', book)
router.use('/words', word)

module.exports = router