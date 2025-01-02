class ChatApp {
    constructor() {
        this.socket = io();
        this.currentUser = null;
        this.theme = 'light';
        this.setupDOM();
        this.setupSocketListeners();
        this.setupEventListeners();
        this.initializeEmojiPicker();
    }

    setupDOM() {
        this.joinScreen = document.getElementById('joinScreen');
        this.chatScreen = document.getElementById('chatScreen');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.usersList = document.getElementById('usersList');
        this.chatMessages = document.getElementById('chatMessages');
        this.onlineCount = document.getElementById('onlineCount');
        this.themeToggle = document.getElementById('themeToggle');
        this.emojiButton = document.getElementById('emojiButton');
        this.emojiPicker = document.getElementById('emojiPicker');
    }

    setupSocketListeners() {
        this.socket.on('message', (data) => this.displayMessage(data));
        this.socket.on('userJoined', (data) => this.handleUserJoined(data));
        this.socket.on('userLeft', (data) => this.handleUserLeft(data));
        this.socket.on('usersList', (users) => this.updateUsersList(users));
    }

    setupEventListeners() {
        document.getElementById('joinButton').addEventListener('click', () => this.joinChat());
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.emojiButton.addEventListener('click', () => this.toggleEmojiPicker());
    }

    joinChat() {
        const username = document.getElementById('username').value.trim();
        const selectedAvatar = document.querySelector('.avatar-option.selected');

        if (!username || !selectedAvatar) {
            this.showError('Please enter a username and select an avatar');
            return;
        }

        this.currentUser = {
            name: username,
            avatar: selectedAvatar.getAttribute('data-avatar')
        };

        this.socket.emit('join', this.currentUser);
        this.joinScreen.classList.add('hidden');
        this.chatScreen.classList.remove('hidden');
        
        // Play welcome animation
        welcome.play();
    }

    sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;

        this.socket.emit('message', { message });
        this.messageInput.value = '';
        
        // Create emoji explosion at send button
        const rect = this.sendButton.getBoundingClientRect();
        animationManager.createEmojiExplosion(rect.left, rect.top);
    }

    displayMessage(data) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${data.id === this.socket.id ? 'sent' : 'received'}`;
        
        messageElement.innerHTML = `
            <div class="message-avatar">
                <img src="${data.avatar}" alt="avatar">
            </div>
            <div class="message-content">
                <div class="message-header">
                    <span class="message-author">${data.name}</span>
                    <span class="message-time">${new Date(data.timestamp).toLocaleTimeString()}</span>
                </div>
                <div class="message-text">${this.formatMessage(data.message)}</div>
            </div>
        `;

        this.chatMessages.appendChild(messageElement);
        this.scrollToBottom();
        animationManager.animateMessage(messageElement);
    }

    formatMessage(message) {
        // Convert URLs to links and emojis to images
        return message
            .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>')
            .replace(/:([\w+-]+):/g, (match, emoji) => {
                return `<span class="emoji">${emoji}</span>`;
            });
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
    }

    // More methods will be added for handling emojis, user lists, and other features
}

// Initialize chat application
const chat = new ChatApp();