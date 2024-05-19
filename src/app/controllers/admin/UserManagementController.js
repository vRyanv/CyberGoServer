const {UserManagementService} = require('../../services')
const {StatusCode} = require("../../constant");

const UserManagementController = {
    GetListAction(req, res) {
        UserManagementService.GetUserList(req.params.status)
            .then(user_list => {
                return res.status(200).json({code: StatusCode.OK, user_list: user_list});
            })
    },
    GetUserDetailAction(req, res) {
        UserManagementService.GetUserDetail(req.params.user_id)
            .then(result => {
                if(result){
                    return res.status(200).json({code: StatusCode.OK, user: result.user, vehicles: result.vehicles});
                }
                return res.status(200).json({code: StatusCode.NOT_FOUND});
            })
    },
    BanUserAction(req, res) {
        UserManagementService.UpdateAccountStatus(req.body)
            .then(result => {
                if(result){
                    return res.status(200).json({code: StatusCode.UPDATED});
                }
                return res.status(200).json({code: StatusCode.NOT_FOUND});
            })
    },
    UnlockUserAction(req, res) {
        UserManagementService.UnlockUser(req.body.user_id)
            .then(result => {
                if(result){
                    return res.status(200).json({code: StatusCode.UPDATED});
                }
                return res.status(200).json({code: StatusCode.NOT_FOUND});
            })
    }
}

module.exports = UserManagementController