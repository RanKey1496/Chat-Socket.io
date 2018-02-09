exports = module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('register', (data) => {
            socket.username = data;
            io.emit('user-registered', { username: socket.username });
        })

        socket.on('add-message', (data) => {
            io.emit('message', { userId: socket.username, message: data });
        });

        socket.on('typing', (data) => {
            socket.broadcast.emit('typing', { userId: socket.username })
        });

        socket.on('notyping', (data) => {
            socket.broadcast.emit('notyping', { userId: socket.username })
        });

        socket.on('disconnect', () => {
            io.emit('user-disconnected', { username: socket.username });
        });
        
    })
}