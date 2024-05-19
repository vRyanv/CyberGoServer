const {UserRepository, VehicleRepository} = require('../../repositories')
const {Mailer} = require('../../utils')
const {log} = require("qrcode/lib/core/galois-field");
const FCMService = require("../FCMService");
const {AccountStatus, FirebaseType} = require("../../constant");
const UserManagementService = {
    async UpdateAccountStatus(body) {
        const {user_id, ban_reason} = body
        const user = await UserRepository.UpdateUserInformation(user_id, {account_status: AccountStatus.BANNED})
        if (!user) {
            return false
        }
        const from_mail = "Cyber Go System"
        const to_mail = user.email
        const subject = "Account information"
        let content = "Your account has been banned because: " + ban_reason
        if (user.firebase_token) {
            FCMService.SendSingleNotification({firebase_type: FirebaseType.ACCOUNT_BANNED}, user.firebase_token)
        }
        await Mailer(from_mail, to_mail, subject, content)
        return true
    },
    async UnlockUser(user_id) {
        const user = await UserRepository.UpdateUserInformation(user_id, {account_status: AccountStatus.ACTIVATED})
        if (!user) {
            return false
        }
        const from_mail = "Cyber Go System"
        const to_mail = user.email
        const subject = "Account information"
        let content = "Your account has been unlocked"
        await Mailer(from_mail, to_mail, subject, content)
        return true
    },
    GetUserList(status) {
        return UserRepository.GetAllUser(status)
    },
    async GetUserDetail(user_id) {
        try {
            const get_user_task = UserRepository.FindUserDetail(user_id)
            const get_vehicle_task = VehicleRepository.FindByUserId(user_id)
            const result = await Promise.all([get_user_task, get_vehicle_task])
            if (!result[0]) {
                return false
            }
            return {user: result[0], vehicles: result[1]}
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

module.exports = UserManagementService