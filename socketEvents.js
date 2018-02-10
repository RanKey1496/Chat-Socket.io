const users = new Array;

exports = module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected ' + socket.id);
        socket.on('register', (data) => {
            socket.username = data;
            users.push(data);
            io.emit('user-registered', { users: users, username: socket.username });
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
            let index = users.indexOf(socket.username);
            if (index != -1) {
                users.splice(index, 1);
            }
            users.filter((e) => e !== socket.username);
            io.emit('user-disconnected', { users: users, username: socket.username });
        });
        
    })
}
