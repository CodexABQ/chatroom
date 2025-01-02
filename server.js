const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const users = new Map();
const messageHistory = [];
const MAX_MESSAGES = 50;

io.on('connection', (socket) => {
    console.log('New user connected');

    // Handle user join
    socket.on('join', (userData) => {
        users.set(socket.id, {
            name: userData.name,
            avatar: userData.avatar
        });

        io.emit('userJoined', {
            id: socket.id,
            name: userData.name,
            message: `${userData.name} has joined the celebration! 🎉`
        });

        // Send current users list
        io.emit('usersList', Array.from(users.values()));
    });

    // Handle messages
    socket.on('message', (data) => {
        const user = users.get(socket.id);
        if (user) {
            const messageData = {
                id: socket.id,
                name: user.name,
                avatar: user.avatar,
                message: data.message,
                timestamp: new Date().toISOString()
            };
            
            messageHistory.push(messageData);
            if (messageHistory.length > MAX_MESSAGES) {
                messageHistory.shift();
            }
            
            io.emit('message', messageData);
        }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        const user = users.get(socket.id);
        if (user) {
            io.emit('userLeft', {
                id: socket.id,
                name: user.name,
                message: `${user.name} has left the celebration 👋`
            });
            users.delete(socket.id);
            io.emit('usersList', Array.from(users.values()));
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});