const {SocketEvent} = require('../constant')
const {UserRepository, ChatRepository} = require('../repositories')
const SocketService = (io) => {
    io.on('connection', function (socket) { 
        console.log('socket id::', socket.id) 
        UserRepository.UpdateOnlineStatus(socket.user.id, true)
            .then(result => {
            }).catch(error => { 
        })

        socket.on(SocketEvent.MESSAGE, (data) => {
            data = JSON.parse(data); 
            const sender_id = socket.user.id
            const {receiver_id, message} = data
            console.log(data)
            console.log(sender_id)
            let new_mess = {
                sender: sender_id,
                send_time: new Date(),
                content: message
            }

            ChatRepository.AddNewMessage(sender_id, receiver_id, new_mess)
            .then(chat => {
                 new_mess = chat.conversations[chat.conversations.length - 1]
                 mess_response = {
                    message_id: new_mess._id.toString(),
                    chat_id: chat._id.toString(),
                    sender_id,
                    sender_avatar: new_mess.sender.avatar,
                    content: new_mess.content,
                    send_time: new_mess.send_time.toISOString()
                 }
                 
                 socket.emit(SocketEvent.MESSAGE, mess_response)
                 console.log(mess_response)
                 const receiver_socket = __user_sockets.get(receiver_id)
                 if(receiver_socket){
                    receiver_socket.emit(SocketEvent.MESSAGE, mess_response)
                 }
            })
        
        })

        

        // socket.on(SocketEvent.NOTIFICATION, (data) => {
        //     const datetime = new Date().getTime();
        //     const notification = {
        //         id: datetime + "",
        //         title: 'cyber go',
        //         avatar: 'avatar_default.webp',
        //         datetime,
        //         content: 'this is content'
        //     }
        //     socket.emit(SocketEvent.NOTIFICATION, JSON.stringify(notification))
        // })

        socket.on('disconnect', () => {
            console.log('disconnect socket id::', socket.id)
            UserRepository.UpdateOnlineStatus(socket.user.id, false)
                .then(result => {

                }).catch(error => {

            })

            socket.removeAllListeners()
            global.__user_sockets.delete(socket.user.id)
        })

    })
}

module.exports = SocketService