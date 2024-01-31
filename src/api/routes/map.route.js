const express = require('express')
const route = express.Router()
const mapController = require('../controllers/map.controller');

route.get('/reverse-geocoding/:lat/:lng', mapController.getAddressAction)
route.get('/search-address/:address/:limit', mapController.searchAddressAction)

module.exports = route