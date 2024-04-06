const {StatusCode} = require('../constant')
const {UserService} = require('../services')

const UserController = {
    async UpdateIdCardAction(req, res) {
        const user_id = req.user.id
        const files = req.files
        let update_result = await UserService.UpdateIdCard(user_id, files)
        const id_card = {}
        if (req.files.front_id_card) {
            id_card.front_id_card = req.files.front_id_card[0].filename
        }
        if (req.files.back_id_card) {
            id_card.back_id_card = req.files.back_id_card[0].filename
        }

        if (update_result) {
            return res.status(200).json({code: StatusCode.UPDATED, ...id_card, message: 'Update id card successfully'})
        }
        return res.status(200).json({code: StatusCode.BAD_REQUEST, message: 'Updating id card failed'})
    },
    async DriverRegistrationAction(req, res) {
        const {vehicle_name, vehicle_type, license_plates} = req.body
        const registration_result = await UserService.DriverRegistration(
                                                        req.user,
                                                        vehicle_name,
                                                        vehicle_type,
                                                        license_plates,
                                                        req.files
                                                    )
        if (registration_result) {
            return res.status(200).json({code: StatusCode.CREATED, message: 'Created driver registration successfully'})
        }
        return res.status(200).json({code: StatusCode.BAD_REQUEST, errors: 'BAD_REQUEST'})
    },
    async ProfileAction(req, res) {
        console.log(req.user)
        let user = await UserService.Profile(req.user.id)
        if (user) {
            user = {
                id: user._id.toString(),
                full_name: user.full_name,
                email: user.email,
                phone_number: user.phone_number,
                country: user.country,
                gender: user.gender,
                avatar: user.avatar,
                address: user.address,
                front_id_card: user.front_id_card,
                back_id_card: user.back_id_card,
                id_number: user.id_number
            }

            return res.status(200).json({code: StatusCode.OK, ...user, message: 'Get profile sucecssfully'})
        }
        return res.status(200).json({code: StatusCode.NOT_FOUND, message: 'Not found profile'})
    },
    async UpdateProfileAction(req, res) {
        const update_result = await UserService.UpdateProfile(
            req.user.id,
            req.file,
            req.body.full_name,
            req.body.gender,
            req.body.id_number,
            req.body.address
        )
        if (update_result) {
            if (update_result.avatar) {
                return res.status(200).json({
                    code: StatusCode.UPDATED,
                    avatar: update_result.avatar,
                    message: 'Updated profile success'
                })
            }
            return res.status(200).json({code: StatusCode.UPDATED, message: 'Updated profile success'})
        } else {
            return res.status(200).json({code: StatusCode.BAD_REQUEST, message: 'Updating profile failed'})
        }
    }
}

module.exports = UserController