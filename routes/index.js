const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const expened = require('./modules/expened')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')
const auth = require('./modules/auth')

router.use('/expened', authenticator, expened)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router
