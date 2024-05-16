const {
  MemberRepository,
  TripRepository,
  UserRepository,
  NotificationRepository,
} = require("../repositories");
const { Helper } = require("../utils");
const { MemberStatus, NotificationType, SocketEvent } = require("../constant");
const FCMService = require("./FCMService");

const MemberService = {
  async MemberLeaveTrip(user, body) {
    const { trip_id, member_id, member_full_name, member_avatar } = body;
    const get_trip_task = TripRepository.FindTripOwnerByTripId(trip_id);
    const remove_member_task = MemberRepository.RemoveById(member_id);
    const remove_member_in_trip_task = TripRepository.RemoveMemberRequest(
      trip_id,
      member_id
    );

    try {
      const result = await Promise.all([
        get_trip_task,
        remove_member_task,
        remove_member_in_trip_task,
      ]);
      const trip = result[0];
      const content = `${member_full_name} has left the trip (${trip.name}) `;
      let notification = {
        title: "The member has left the trip",
        user: trip.trip_owner._id.toString(),
        avatar: member_avatar,
        content,
        type: NotificationType.USER,
      };

      notification = await NotificationRepository.CreateNotification(
        notification
      );
      notification = {
        _id: notification._id.toString(),
        datetime: notification.createdAt.getTime().toString(),
        avatar: notification.avatar,
        title: notification.title,
        content: notification.content,
      };
      const { firebase_token } = trip.trip_owner;
      if (firebase_token != "") {
        FCMService.SendSingleNotification({ ...notification }, firebase_token);
      }

      const member_socket = __user_sockets.get(trip.trip_owner._id.toString());
      if (member_socket) {
        member_socket.emit(SocketEvent.PASSENGER_LEAVE);
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async AcceptMemberRequest(body) {
    console.log(body);
    const { trip_id, member } = body;
    const trip = await TripRepository.FindTripOwnerByTripId(trip_id);
    let notification = {
      title: "Joining request has been accepted",
      user: member.user_id,
      avatar: trip.trip_owner.avatar,
      content: trip.name,
      type: NotificationType.USER,
    };

    try {
      const new_notification_task =
        NotificationRepository.CreateNotification(notification);
      const update_member_status_task =
        MemberRepository.UpdateMemberJoinedStatus(member.member_id);
      const find_member_user_task = UserRepository.FindById(member.user_id);
      const result_task = await Promise.all([
        new_notification_task,
        find_member_user_task,
        update_member_status_task,
      ]);

      notification = result_task[0];
      notification = {
        _id: notification._id.toString(),
        datetime: notification.createdAt.getTime().toString(),
        avatar: notification.avatar,
        title: notification.title,
        content: notification.content,
      };

      const { firebase_token } = result_task[1];
      if (firebase_token != "") {
        FCMService.SendSingleNotification({ ...notification }, firebase_token);
      }
      const member_socket = __user_sockets.get(member.user_id.toString());
      if (member_socket) {
        member_socket.emit(SocketEvent.PASSENGER_REQUEST);
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async DeniedMemberRequest(body) {
    const { trip_id, member } = body;
    const trip = await TripRepository.FindTripOwnerByTripId(trip_id);
    let notification = {
      title: "The request to participate was denied",
      user: member.user_id,
      avatar: trip.trip_owner.avatar,
      content: trip.name,
      type: NotificationType.USER,
    };

    try {
      const remove_member_task = MemberRepository.RemoveMemberRequest(
        member.member_id
      );
      const remove_member_in_trip_task = TripRepository.RemoveMemberRequest(
        trip_id,
        member.member_id
      );
      const new_notification_task =
        NotificationRepository.CreateNotification(notification);

      const result = await Promise.all([
        new_notification_task,
        remove_member_task,
        remove_member_in_trip_task,
      ]);

      notification = result[0];
      notification = {
        _id: notification._id.toString(),
        datetime: notification.createdAt.getTime().toString(),
        avatar: notification.avatar,
        title: notification.title,
        content: notification.content,
      };
      const member_user = result[1];
      const { firebase_token } = member_user.user;
      if (firebase_token != "") {
        FCMService.SendSingleNotification({ ...notification }, firebase_token);
      }
      if (member_user.user.online_status) {
        const member_socket = __user_sockets.get(
          member_user.user._id.toString()
        );
        if (member_socket) {
          member_socket.emit(SocketEvent.PASSENGER_REQUEST);
        }
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async MemberRequestToJoinTrip(user_id, body) {
    const trip_id = body.trip_id;
    const { origin, destination, geometry } = body;
    const member = {
      user: user_id,
      origin,
      destination,
      geometry,
      status: MemberStatus.QUEUE,
    };
    const member_user = await UserRepository.FindById(user_id);
    try {
      let trip = await MemberRepository.InsertMemberToTrip(trip_id, member);

      trip.members.map((member) => {
        member.createdAt = member.createdAt.getTime();
      });

      trip.start_date = Helper.DatePadStart(trip.start_date);

      let notification = {
        title: "Request to join the trip",
        user: trip.trip_owner._id.toString(),
        avatar: member_user.avatar,
        content: trip.name,
        type: NotificationType.USER,
      };
      const { firebase_token } = trip.trip_owner;
      NotificationRepository.CreateNotification(notification).then(
        (new_notification) => {
          notification = {
            _id: new_notification._id.toString(),
            datetime: new_notification.createdAt.getTime().toString(),
            avatar: new_notification.avatar,
            title: new_notification.title,
            content: new_notification.content,
          };

          if (firebase_token != "") {
            FCMService.SendSingleNotification(
              { ...notification },
              firebase_token
            );
          }
        }
      );

      if (trip.trip_owner.online_status) {
        const trip_owner_socket = __user_sockets.get(
          trip.trip_owner._id.toString()
        );
        if (trip_owner_socket) {
          trip_owner_socket.emit(SocketEvent.PASSENGER_REQUEST);
        }
      }

      //   if (member_user.online_status) {
      //     const member_socket = __user_sockets.get(member_user._id.toString());
      //     if (member_socket) {
      //         member_socket.emit(SocketEvent.PASSENGER_REQUEST);
      //     }
      //   }
      trip.trip_owner = trip.trip_owner._id.toString();
      return trip;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

module.exports = MemberService;
