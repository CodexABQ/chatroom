class AnimationManager {
    constructor() {
        this.particlesContainer = document.querySelector('.button-particles');
        this.messageAnimations = new Map();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Animate join button on hover
        const joinButton = document.getElementById('joinButton');
        if (joinButton) {
            joinButton.addEventListener('mouseenter', () => this.createParticles());
            joinButton.addEventListener('mouseleave', () => this.clearParticles());
        }

        // Animate send button
        const sendButton = document.getElementById('sendButton');
        if (sendButton) {
            sendButton.addEventListener('click', () => this.animateSend());
        }
    }

    createParticles() {
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.setProperty('--particle-delay', `${Math.random() * 1}s`);
            this.particlesContainer.appendChild(particle);
        }
    }

    clearParticles() {
        this.particlesContainer.innerHTML = '';
    }

    animateSend() {
        const sendIcon = document.querySelector('.send-icon');
        sendIcon.style.transform = 'translateX(50px) scale(0)';
        setTimeout(() => {
            sendIcon.style.transform = '';
        }, 500);
    }

    animateMessage(messageElement) {
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(20px)';
        
        requestAnimationFrame(() => {
            messageElement.style.opacity = '1';
            messageElement.style.transform = 'translateY(0)';
        });
    }

    createEmojiExplosion(x, y) {
        const emojis = ['🎉', '✨', '🎊', '🎈', '🎆', '🎇'];
        const container = document.createElement('div');
        container.className = 'emoji-explosion';
        container.style.left = `${x}px`;
        container.style.top = `${y}px`;

        for (let i = 0; i < 10; i++) {
            const emoji = document.createElement('span');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.setProperty('--angle', `${Math.random() * 360}deg`);
            emoji.style.setProperty('--distance', `${Math.random() * 100 + 50}px`);
            container.appendChild(emoji);
        }

        document.body.appendChild(container);
        setTimeout(() => container.remove(), 1000);
    }
}

// Initialize animation manager
const animationManager = new AnimationManager();