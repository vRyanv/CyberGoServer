const express = require('express')
const route = express.Router()
const {MemberController} = require('../../../controllers');

route.post('/request-to-join', MemberController.RequestToJoinAction)
route.put('/update-status', MemberController.UpdateMemeberStatusAction)
route.put('/leave', MemberController.MemberLeaveTripAction)

module.exports = route