const {SocketEvent} = require('../constant')
const {UserRepository} = require('../repositories')
const SocketService = (io) => {
    io.on('connection', function (socket) {
        console.log('socket id::', socket.id)
        UserRepository.UpdateOnlineStatus(socket.user.id, true)
            .then(result => {
            }).catch(error => {
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