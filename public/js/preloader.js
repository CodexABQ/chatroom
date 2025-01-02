// Preloader animation configuration
const preloaderAnimation = {
    container: document.getElementById('preloader-animation'),
    path: 'https://assets10.lottiefiles.com/packages/lf20_bbxigxft.json', // New Year themed loading animation
    renderer: 'svg',
    loop: true,
    autoplay: true
};

// Initialize preloader animation
const preloader = lottie.loadAnimation(preloaderAnimation);

// Fireworks animation for join screen
const fireworksAnimation = {
    container: document.getElementById('fireworksAnimation'),
    path: 'https://assets3.lottiefiles.com/packages/lf20_rovf9gzu.json', // Fireworks animation
    renderer: 'svg',
    loop: true,
    autoplay: true
};

// Initialize fireworks
const fireworks = lottie.loadAnimation(fireworksAnimation);

// Welcome animation for chat screen
const welcomeAnimation = {
    container: document.getElementById('welcomeAnimation'),
    path: 'https://assets2.lottiefiles.com/packages/lf20_aZTdD5.json', // Celebration animation
    renderer: 'svg',
    loop: false,
    autoplay: false
};

// Initialize welcome animation
const welcome = lottie.loadAnimation(welcomeAnimation);

// Handle page load
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.preloader').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.preloader').style.display = 'none';
            // Play welcome animation when entering chat
            welcome.play();
        }, 500);
    }, 2000);
});