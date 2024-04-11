const express = require('express')
const route = express.Router()
const {MapController} = require('../../controllers');

route.post('/create', MapController.getAddressAction)
route.put('/update', MapController.searchAddressAction)

module.exports = route