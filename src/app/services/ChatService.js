const { ChatRepository } = require("../repositories");
const ChatService = {
  async GetPrivateChat(user, params) {
    const { receiver_id } = params;

    function CreateChatResponse(chat) {
      let receiver;
      for (const member of chat.members) {
        if (member._id.toString() == receiver_id) {
          receiver = member;
          chat.receiver_id = receiver_id;
          chat.receiver_avatar = member.avatar;
          chat.receiver_full_name = member.full_name;

          if (!chat.is_new_chat) {
            const conversations = chat.conversations;
            const message_list = conversations.map((conver) => {
              return {
                message_id: conver._id.toString(),
                chat_id: chat._id.toString(),
                sender_id: conver.sender._id.toString(),
                sender_avatar: conver.sender.avatar,
                content: conver.content,
                send_time: conver.send_time.toISOString(),
              };
            });

            chat.message_list = message_list;
            delete chat.conversations;
          }

          return chat;
        }
      }
    }

    let chat = await ChatRepository.FindPrivateChat(user.id, receiver_id);
    if (chat) {
      chat = CreateChatResponse(chat);
      chat.is_new_chat = false;
      delete chat.members;
      return chat;
    }

    let new_chat = {
      members: [user.id, receiver_id],
      conversations: [],
    };
    chat = await ChatRepository.Create(new_chat);
    chat = await ChatRepository.FindById(chat._id.toString());
    chat.is_new_chat = true;
    chat = CreateChatResponse(chat);
    delete chat.members;
    return chat;
  },
  async GetChatList(user_id) {
    let chat_list = await ChatRepository.GetChatList(user_id);
    chat_list = chat_list.map((chat) => {
      let receiver = chat.members[0]._id.toString() != user_id ? chat.members[0] : chat.members[1]

      let last_message = ""
      let last_message_time = ""
      if(chat.conversations.length > 0){
        const conver = chat.conversations[chat.conversations.length - 1]
        last_message = conver.content
        last_message_time = conver.send_time.toISOString()
      }
    
      return {
        chat_id: chat._id.toString(),
        receiver_id: receiver._id.toString(),
        receiver_avatar: receiver.avatar,
        receiver_full_name: receiver.full_name,
        last_message,
        last_message_time,
        is_online: receiver.online_status
      }
    });
    
    return chat_list
  },
};

module.exports = ChatService;
