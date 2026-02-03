/* ========================================
   VALENTINE'S DAY WEBSITE - JAVASCRIPT
   Interactivity, Animations, and Logic
   ======================================== */

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeHearts();
    setupMusicControl();
    setupScrollAnimations();
    setupTypewriter();
    preventAudioAutoplay();
});

// ===== AUDIO/MUSIC CONTROL =====
/**
 * CUSTOMIZE:
 * - Update the audio src in index.html <audio> element
 * - Or replace with your own music file
 * - Supported formats: MP3, WAV, OGG
 * - Music starts on first user interaction (intro button click)
 */

let isAudioPlaying = false;
const audio = document.getElementById('backgroundMusic');

function setupMusicControl() {
    // Set volume to moderate level
    audio.volume = 0.4;
}

function startJourneyAndMusic() {
    // Start music on first interaction
    playMusic();
    // Then navigate to next section
    scrollToNext('love-story-section');
}

function playMusic() {
    if (!isAudioPlaying) {
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    isAudioPlaying = true;
                    fadeInAudio();
                })
                .catch(error => {
                    console.log('Audio play failed:', error);
                });
        }
    }
}

function fadeInAudio() {
    let volume = 0.1;
    audio.volume = volume;
    const fadeInterval = setInterval(() => {
        if (volume < 0.4) {
            volume += 0.05;
            audio.volume = volume;
        } else {
            clearInterval(fadeInterval);
        }
    }, 100);
}

function preventAudioAutoplay() {
    // Prevent autoplay - require user interaction
    audio.autoplay = false;
}

// ===== FLOATING HEARTS ANIMATION =====
function initializeHearts() {
    const container = document.querySelector('.hearts-container');
    
    // Create floating hearts periodically
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.textContent = '❤️';
        
        // Random horizontal position
        const leftPos = Math.random() * 100;
        heart.style.left = leftPos + '%';
        
        // Random animation duration for variety
        const duration = 6 + Math.random() * 4;
        heart.style.animationDuration = duration + 's';
        
        // Random delay
        const delay = Math.random() * 2;
        heart.style.animationDelay = delay + 's';
        
        container.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, (duration + delay) * 1000);
    }, 500);
}

// ===== SCROLL ANIMATIONS =====
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

// ===== TYPEWRITER ANIMATION =====
/**
 * CUSTOMIZE:
 * The typewriter effect applies to the text in .story-text
 * Change the text in index.html to customize the love story
 */

function setupTypewriter() {
    const typewriterElement = document.getElementById('typewriter-text');
    if (!typewriterElement) return;

    const text = typewriterElement.textContent;
    typewriterElement.textContent = '';

    let index = 0;
    const speed = 40; // Milliseconds per character

    function typeCharacter() {
        if (index < text.length) {
            typewriterElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeCharacter, speed);
        }
    }

    // Start typing when element comes into view
    const typewriterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && index === 0) {
                typeCharacter();
                typewriterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    typewriterObserver.observe(typewriterElement);
}

// ===== SMOOTH SCROLL TO NEXT SECTION =====
function scrollToNext(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== SURPRISE REVEAL MECHANISM =====
/**
 * CUSTOMIZE:
 * The hidden message is revealed when clicking the surprise button.
 * Edit the message text in index.html #hidden-message div
 */

function triggerSurprise() {
    const hiddenMessage = document.getElementById('hidden-message');
    const revealBtn = document.getElementById('reveal-btn');
    const surpriseBtn = document.querySelector('.surprise-btn');

    // Darken the screen slightly
    document.body.style.filter = 'brightness(0.7)';

    // Create soft heart burst effect
    createHeartBurst(5);

    // Show the message after a brief delay
    setTimeout(() => {
        hiddenMessage.classList.add('revealed');
        revealBtn.classList.remove('hidden');
        
        // Scroll to message
        setTimeout(() => {
            hiddenMessage.scrollIntoView({ behavior: 'smooth' });
            document.body.style.filter = 'brightness(1)';
        }, 500);
    }, 800);

    // Disable the button after clicking
    surpriseBtn.disabled = true;
    surpriseBtn.style.opacity = '0.6';
}

function revealMessage() {
    const proposalSection = document.getElementById('proposal-section');
    proposalSection.scrollIntoView({ behavior: 'smooth' });
}

// ===== HEART BURST EFFECT =====
function createHeartBurst(count = 10) {
    const container = document.getElementById('celebration-container');
    
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.classList.add('confetti-piece');
        heart.textContent = '❤️';
        
        // Random starting position
        heart.style.left = (Math.random() * 100) + '%';
        heart.style.top = '50%';
        
        // Random horizontal movement
        const xDirection = (Math.random() - 0.5) * 200;
        heart.style.setProperty('--x', xDirection + 'px');
        
        container.appendChild(heart);
        
        // Custom animation for burst
        heart.animate([
            {
                opacity: 1,
                transform: `translate(0, 0) scale(1)`,
                offset: 0
            },
            {
                opacity: 0.8,
                transform: `translate(${xDirection}px, -100px) scale(1.2)`,
                offset: 0.5
            },
            {
                opacity: 0,
                transform: `translate(${xDirection}px, 200px) scale(0)`,
                offset: 1
            }
        ], {
            duration: 2000,
            easing: 'ease-out'
        });

        // Remove after animation
        setTimeout(() => heart.remove(), 2000);
    }
}

// ===== PROPOSAL YES/ALWAYS HANDLER =====
/**
 * Handle the response to the proposal.
 * Both buttons trigger celebration because there's no wrong answer! 💕
 */

function handleYes() {
    celebrateProposal();
    scrollToNext('forever-section');
}

function handleAlways() {
    celebrateProposal();
    scrollToNext('forever-section');
}

function celebrateProposal() {
    // Create large celebration with confetti/hearts
    createConfettiExplosion(30);
    
    // Brief music boost if playing
    if (isAudioPlaying) {
        audio.volume = 0.6;
        setTimeout(() => {
            audio.volume = 0.4;
        }, 2000);
    }

    // Add hearts floating everywhere
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.textContent = '💖';
            heart.style.left = Math.random() * 100 + '%';
            const duration = 3 + Math.random() * 2;
            heart.style.animationDuration = duration + 's';
            document.querySelector('.hearts-container').appendChild(heart);
            
            setTimeout(() => heart.remove(), duration * 1000);
        }, i * 100);
    }
}

function createConfettiExplosion(count = 30) {
    const container = document.getElementById('celebration-container');
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-piece');
        
        // Mix of heart and sparkle emojis
        const emojis = ['❤️', '💖', '✨', '💕', '🌹'];
        confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        confetti.style.left = centerX + 'px';
        confetti.style.top = centerY + 'px';
        confetti.style.zIndex = 9999;
        
        container.appendChild(confetti);

        // Randomize burst direction
        const angle = (Math.PI * 2 * i) / count;
        const velocity = 150 + Math.random() * 200;
        const endX = centerX + Math.cos(angle) * velocity;
        const endY = centerY + Math.sin(angle) * velocity;

        confetti.animate([
            {
                transform: 'translate(0, 0) scale(1) rotate(0deg)',
                opacity: 1,
                offset: 0
            },
            {
                opacity: 0.8,
                offset: 0.5
            },
            {
                transform: `translate(${endX - centerX}px, ${endY - centerY + 100}px) scale(0.5) rotate(360deg)`,
                opacity: 0,
                offset: 1
            }
        ], {
            duration: 2500,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });

        // Clean up
        setTimeout(() => confetti.remove(), 2500);
    }
}

// ===== CURSOR TRAIL EFFECT (OPTIONAL) =====
/**
 * Uncomment below for a heart trail that follows your cursor
 * This is an optional "magic" effect
 */

function initializeCursorTrail() {
    document.addEventListener('mousemove', (e) => {
        // Only create trail occasionally (every 3rd move) to avoid performance issues
        if (Math.random() < 0.2) {
            const heart = document.createElement('div');
            heart.textContent = '✨';
            heart.style.position = 'fixed';
            heart.style.left = e.clientX + 'px';
            heart.style.top = e.clientY + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '5';
            heart.style.fontSize = '1rem';
            heart.style.opacity = '0.8';

            document.body.appendChild(heart);

            // Fade out animation
            heart.animate([
                { opacity: 1, transform: 'translate(0, 0)' },
                { opacity: 0, transform: 'translate(0, -20px)' }
            ], {
                duration: 800,
                easing: 'ease-out'
            });

            setTimeout(() => heart.remove(), 800);
        }
    });
}

// Uncomment the line below to enable cursor trail
// initializeCursorTrail();

// ===== UTILITY: CHECK IF ELEMENT IS IN VIEWPORT =====
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// ===== PAGE VISIBILITY HANDLING =====
/**
 * Pause music if user switches tabs/windows
 * Resume when they come back
 */
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden
        if (isAudioPlaying) {
            audio.pause();
        }
    } else {
        // Page is visible again
        if (isAudioPlaying) {
            audio.play().catch(error => {
                console.log('Resume audio failed:', error);
            });
        }
    }
});

// ===== KEYBOARD SHORTCUTS (OPTIONAL) =====
/**
 * Add keyboard shortcuts for better UX:
 * - Spacebar to play/pause music
 * - Arrow keys to navigate sections
 */

document.addEventListener('keydown', (e) => {
    // Spacebar plays first interaction if on intro section
    if (e.code === 'Space' && document.activeElement === document.body) {
        e.preventDefault();
        const introBtn = document.querySelector('.intro-btn');
        if (introBtn && !isAudioPlaying) {
            startJourneyAndMusic();
        }
    }
});

// ===== MOBILE OPTIMIZATION =====
/**
 * Adjust animations for mobile devices
 */

if (window.innerWidth < 768) {
    // Reduce number of floating hearts on mobile
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .heart {
                font-size: 1.5rem;
                opacity: 0.3;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== PERFORMANCE OPTIMIZATION =====
/**
 * Use requestAnimationFrame for smooth animations
 */

let ticking = false;

function updateAnimations() {
    // Animations are CSS-based for better performance
    // JavaScript handles only critical interactions
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateAnimations);
        ticking = true;
    }
});

// ===== DEBUG MODE (COMMENT OUT IN PRODUCTION) =====
/**
 * Uncomment for development/debugging
 */

// console.log('Valentine\'s Day Website Loaded ❤️');
// console.log('Audio element:', audio);
// console.log('Is audio playing:', isAudioPlaying);

// ===== END OF SCRIPT =====
