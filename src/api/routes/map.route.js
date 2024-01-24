const express = require('express')
const route = express.Router()
const mapController = require('../controllers/map.controller');

route.get('/reverse-geocoding/:lat/:long', mapController.getGetAddressAction)

module.exports = route