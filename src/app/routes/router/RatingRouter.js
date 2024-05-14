const express = require('express')
const route = express.Router()
const {RatingController} = require('../../controllers');

route.get('/list/:user_id', RatingController.List)
route.post('/create', RatingController.Create)

module.exports = route