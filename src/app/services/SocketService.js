const SocketService = (socket) => {

    socket.on('connection', () => {
        console.log('socket id::', socket.id)
    })

    socket.on('disconnect', () => {
        console.log('socket id::', socket.id)
        socket.removeAllListeners()
        global.__user_sockets.get()

    })
}

module.exports = SocketService