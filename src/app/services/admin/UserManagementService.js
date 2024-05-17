const {UserRepository, VehicleRepository} = require('../../repositories')

const UserManagementService = {
    GetUserList(status){
        return UserRepository.GetAllUser(status)
    },
    async GetUserDetail(user_id){
        try{
            const get_user_task = UserRepository.FindUserDetail(user_id)
            const get_vehicle_task = VehicleRepository.FindByUserId(user_id)
            const result = await Promise.all([get_user_task, get_vehicle_task])
            if(!result[0]){
                return false
            }
            return {user:result[0], vehicles: result[1]}
        } catch (error){
            console.log(error)
            return false
        }
    }
}

module.exports = UserManagementService