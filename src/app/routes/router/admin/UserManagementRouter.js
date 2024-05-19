const express = require('express')
const route = express.Router()

const {UserManagementController} = require('../../../controllers')

route.get('/list/:status', UserManagementController.GetListAction)
route.get('/detail/:user_id', UserManagementController.GetUserDetailAction)
route.put('/ban-user', UserManagementController.BanUserAction)
route.put('/unlock-user', UserManagementController.UnlockUserAction)


module.exports = route