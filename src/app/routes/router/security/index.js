const express = require('express')
const route = express.Router()
const SignInRouter = require('./SignInRouter')
const SignUpRouter = require('./SignUpRouter')

route.use('/sign-in', SignInRouter)
route.use('/sign-up', SignUpRouter)

module.exports = route