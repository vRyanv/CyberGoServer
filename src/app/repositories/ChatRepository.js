const mongoose = require("mongoose");
const Types = mongoose.Types;
const { Chat } = require("../schemas");

const ChatRepository = {
  FindById(chat_id){
    return Chat.findById(chat_id) 
    .populate("members")
    .populate({
      path: "conversations",
      populate: "sender",
      options: { sort: { send_time: "des" } },
    }).lean()
  },
  Create(chat) {
    return Chat.create(chat)
  },
  AddNewMessage(sender, receiver, conversation) {
    return Chat.findOneAndUpdate(
      {
        members: {
          $all: [new Types.ObjectId(sender), new Types.ObjectId(receiver)],
        },
      },
      { $push: { conversations: conversation } },
      {new: true}
    ).populate({
      path: 'conversations',
      populate: {
        path: 'sender',
        select: 'avatar'
      },
    })
  },
  FindPrivateChat(sender, receiver) {
    return Chat.findOne({
      members: {
        $all: [new Types.ObjectId(sender), new Types.ObjectId(receiver)],
      },
    })
      .populate("members")
      .populate({
        path: "conversations",
        populate: "sender",
        options: { sort: { send_time: "desc" } },
      }).lean()
  },
  GetChatList(user_id){
      return Chat.find({members: user_id}).populate('members').sort({updatedAt: 'desc'}).lean()
  }
};

module.exports = ChatRepository;
