const express = require('express')
const route = express.Router()
const {MapController} = require('../../controllers');

route.get('/reverse-geocoding/:lat/:lng', MapController.getAddressAction)
route.get('/search-address/:address/:limit', MapController.searchAddressAction)

module.exports = route