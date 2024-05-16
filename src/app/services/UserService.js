const {
  StatusCode,
  AccountStatus,
  ErrorType,
  DEFAULT_AVATAR,
  StoragePath,
  VehicleType,
} = require("../constant");

const {
  UserRepository,
  CountryRepository,
  DriverRegistrationRepository,
  NotificationRepository,
  TripRepository,
} = require("../repositories");

const { JWT, SecurityUtil, FileUtil } = require("../utils");

const UserService = {
  async UpdatePassword(user_id, body){
      let {current_password, new_password} = body
      console.log(body)
      const user = await UserRepository.FindById(user_id)
      if(!user){
        return false
      }

      const is_valid_pass = await SecurityUtil.Compare(current_password, user.password)
      if(!is_valid_pass){
          return false
      }

      new_password = await SecurityUtil.Hash(new_password)
      try{
        return await UserRepository.UpdateUserInformation(user_id, {password: new_password})
      } catch(error){
        console.log(error)
        return false
      }


  },
  async GetStatistic(user, params) {
    const { start_date, end_date } = params;
    const trip_list = await TripRepository.FindTripByDate(
      user.id,
      start_date,
      end_date
    );

    //trip quantity of vehicle
    let moto_trip = 0;
    let truck_trip = 0;
    let car_trip = 0;

    //revenue of vehicle
    let car_revenue = 0;
    let truck_revenue = 0;
    let moto_revenue = 0;
    trip_list.map((trip) => {
      switch (trip.vehicle.vehicle_type) {
        case VehicleType.MOTO:
          moto_trip++;
          moto_revenue += trip.price;
          break;
        case VehicleType.TRUCK:
          truck_trip++;
          truck_revenue += trip.price;
          break;
        case VehicleType.CAR:
          car_trip++;
          car_revenue += trip.price;
          break;
      }
    });

    const trip_quantity_of_vehicle = {
      moto: moto_trip,
      truck: truck_trip,
      car: car_trip,
    };
    const revenue_of_vehicle = {
      moto: moto_revenue,
      truck: truck_revenue,
      car: car_revenue,
    };
    return { trip_quantity_of_vehicle, revenue_of_vehicle };
  },
  async GetNotification(user_id) {
    const notifications = await NotificationRepository.GetNotificationOfUser(
      user_id
    );
    const notification_list = [];
    notifications.map((notify) => {
      notification_list.push({
        ...notify,
        datetime: notify.createdAt.getTime(),
      });
    });
    return notification_list;
  },
  async UpdateFirebaseToken(user_id, firebase_token) {
    try {
      return await UserRepository.UpdateFirebaseToken(user_id, firebase_token);
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  async DriverRegistration(
    user,
    vehicle_name,
    vehicle_type,
    license_plates,
    files
  ) {
    const vehicle_registration_certificate = {
      front_vehicle_registration_certificate:
        files.front_vehicle_registration_certificate[0].filename,
      back_vehicle_registration_certificate:
        files.front_vehicle_registration_certificate[0].filename,
    };
    const driving_licenses = {
      front_driving_license: files.front_driving_license[0].filename,
      back_driving_license: files.back_driving_license[0].filename,
    };
    const vehicle_img = {
      front_vehicle: files.front_vehicle[0].filename,
      back_vehicle: files.back_vehicle[0].filename,
      right_vehicle: files.right_vehicle[0].filename,
      left_vehicle: files.left_vehicle[0].filename,
    };

    const vehicle = {
      driver: user.id,
      vehicle_name,
      vehicle_type,
      license_plates,
      registration_date: new Date(),
      ...vehicle_registration_certificate,
      ...driving_licenses,
      ...vehicle_img,
    };

    try {
      await DriverRegistrationRepository.CreateDriverRegistration(vehicle);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  async UpdateIdCard(user_id, id_number, files) {
    const user = {
      id_number,
      front_id_card: files.front_id_card && files.front_id_card[0].filename,
      back_id_card: files.back_id_card && files.back_id_card[0].filename,
    };
    try {
      const user_found = await UserRepository.UpdateUserInformation(
        user_id,
        user
      );
      if (files.front_id_card) {
        FileUtil.DeleteFile(StoragePath.ID_CARD_PATH, user_found.front_id_card);
      }

      if (files.back_id_card) {
        FileUtil.DeleteFile(StoragePath.ID_CARD_PATH, user_found.back_id_card);
      }
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  async UpdateProfile(user_id, avatar, body) {
    const user = {
      user_id,
      full_name: body.full_name,
      birthday: body.birthday,
      gender: body.gender,
      id_number: body.id_number,
      address: body.address,
    };
    if (avatar) {
      user.avatar = avatar.filename;
    }
    console.log(user);
    try {
      const user_found = await UserRepository.UpdateUserInformation(
        user_id,
        user
      );
      if (avatar && user_found.avatar !== DEFAULT_AVATAR) {
        FileUtil.DeleteFile(StoragePath.AVATAR_PATH, user_found.avatar);
      }
      if (avatar) {
        return { avatar: user.avatar };
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  Profile(user_id) {
    return UserRepository.FindById(user_id);
  },
  async SignIn(email, password) {
    let user = await UserRepository.FindByEmail(email);
    if (user != null && user.account_status === AccountStatus.VERIFY) {
      return StatusCode.VERIFY;
    }

    if (!user) {
      return StatusCode.NOT_FOUND;
    }

    const is_valid_pass = await SecurityUtil.Compare(password, user.password);
    if (!is_valid_pass) {
      return StatusCode.NOT_FOUND;
    }

    const token_object = {
      id: user._id,
      role: user.role,
    };
    const phone_number = user.country.prefix + user.phone_number;
    return {
      token: JWT.Create(token_object),
      user_id: user._id.toString(),
      avatar: user.avatar,
      role: user.role,
      full_name: user.full_name,
      phone_number,
    };
  },
  async SignUp(user) {
    const email_used = await UserRepository.FindByEmail(user.email);
    if (
      email_used != null &&
      email_used.account_status === AccountStatus.VERIFY &&
      email_used.otp_code !== 0
    ) {
      return StatusCode.VERIFY;
    }

    let phone_number_existed = await UserRepository.FindByPhoneNumber(
      user.phone_number
    );
    if (phone_number_existed) {
      return ErrorType.PHONE_EXISTED;
    }

    if (user.password !== user.confirm_password) {
      return ErrorType.PASS_NOT_MATCH_CONFIRM_PPASS;
    }

    let country = await CountryRepository.FindCountryByPrefix(
      user.number_prefix
    );

    user.country = country._id;
    user.password = await SecurityUtil.Hash(user.password);
    try {
      const new_user = await UserRepository.Create(user);
      return { new_user };
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

module.exports = UserService;
