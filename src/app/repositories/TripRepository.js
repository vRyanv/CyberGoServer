const { Trip } = require("../schemas");
const { MemberStatus, TripStatus } = require("../constant");
const TripRepository = {
  FindTripByDate(user_id, start_date, end_date) {
    return Trip.find({
      trip_owner: user_id,
      start_date: {
        $gte: start_date,
        $lte: end_date,
      },
      status: TripStatus.FINISH,
    }).populate('vehicle').lean();
  },
  FindAndDeleteTrip(user_id, trip_id) {
    return Trip.findOneAndDelete({ trip_owner: user_id, _id: trip_id })
      .populate("trip_owner")
      .populate({
        path: "members",
        populate: "user",
      })
      .lean();
  },
  FindTripOwnerByTripId(trip_id) {
    return Trip.findById(trip_id).populate("trip_owner").lean();
  },
  RemoveMemberRequest(trip_id, member_id) {
    return Trip.updateOne({ _id: trip_id }, { $pull: { members: member_id } });
  },
  FindById(trip_id) {
    return Trip.findById(trip_id).lean();
  },
  UpdateInformation(user_id, trip_id, update_trip) {
    return Trip.updateOne({ trip_owner: user_id, _id: trip_id }, update_trip);
  },
  FindMemberByTripId(trip_id) {
    return Trip.findOne({ _id: trip_id })
      .populate("members")
      .select("members")
      .lean();
  },
  UpdateStatus(user_id, trip_id, status) {
    return Trip.findOneAndUpdate(
      { trip_owner: user_id, _id: trip_id },
      { status }
    )
      .populate({
        path: "members",
        populate: {
          path: "user",
          select: "firebase_token online_status",
        },
      })
      .populate({
        path: "trip_owner",
        select: "avatar",
      })
      .lean();
  },
  GetTripList() {
    return Trip.find({})
      .populate("trip_owner")
      .populate("destinations")
      .populate("vehicle")
      .populate({
        path: "members",
        populate: "user",
      })
      .sort({ createdAt: "desc" })
      .lean();
  },
  Create(trip_sharing) {
    return Trip.create(trip_sharing);
  },
  FindTripOpening(user_id, target_date) {
    return Trip.find({
      status: TripStatus.OPENING,
      start_date: target_date,
      trip_owner: { $ne: user_id },
    })
      .populate("destinations")
      .populate("trip_owner")
      .populate({
        path: "members",
        populate: "user",
      })
      .populate("vehicle")
      .sort({ createdAt: "desc" })
      .lean();
  },
  FindAllTrip() {
    return Trip.find({})
      .populate("destinations")
      .populate("trip_owner")
      .populate({
        path: "members",
        populate: "user",
        match: { status: MemberStatus.ACCEPTED },
      })
      .populate("vehicle")
      .sort({ createdAt: "desc" })
      .lean();
  },
};

module.exports = TripRepository;
