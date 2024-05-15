const express = require('express')
const route = express.Router()
const {ChatController} = require('../../controllers');

route.get('/list', ChatController.GetChatListAction)
route.get('/private-chat/:receiver_id', ChatController.GetPrivateChatAction)

module.exports = route