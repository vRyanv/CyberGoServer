const { StatusCode } = require('../constant')
const {ChatService} = require('../services')

const ChatController = {
    GetChatListAction(req, res){
        ChatService.GetChatList(req.user.id)
        .then(chat_list => {
            if(chat_list){
                console.log(chat_list)
                return res.status(200).json({code: StatusCode.OK, chat_list})
            }
            return res.status(200).json({code: StatusCode.NOT_FOUND})
        })
    },
    GetPrivateChatAction(req, res){
        ChatService.GetPrivateChat(req.user, req.params)
        .then(chat => {
            if(chat){
                return res.status(200).json({code: StatusCode.OK, chat})
            }
            return res.status(200).json({code: StatusCode.NOT_FOUND})
        })
    },
}

module.exports = ChatController