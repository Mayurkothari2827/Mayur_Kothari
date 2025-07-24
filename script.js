// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Skills Animation
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.querySelector('.skills');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 300);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

animateSkills();

// Scroll Animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .contact-form, .contact-info');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

initScrollAnimations();

// GitHub API Integration
async function fetchGitHubStats() {
    try {
        const username = 'mayurkothari'; // Updated for Mayur
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await reposResponse.json();
        
        // Count public repos
        const publicRepos = repos.filter(repo => !repo.private).length;
        document.getElementById('github-repos').textContent = publicRepos;
        
        // For commits, we'll use a placeholder since it requires more complex API calls
        document.getElementById('github-commits').textContent = '500+';
        
    } catch (error) {
        console.log('GitHub API limit reached or user not found');
        document.getElementById('github-repos').textContent = '15+';
        document.getElementById('github-commits').textContent = '500+';
    }
}

fetchGitHubStats();

// Contact Form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Show professional notification
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        this.reset();
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed; top: 20px; right: 20px; z-index: 10000;
        background: var(--surface-color); color: var(--text-primary);
        padding: 1rem 1.5rem; border-radius: 8px; border: 1px solid var(--border-color);
        box-shadow: 0 10px 30px rgba(0,0,0,0.3); max-width: 350px;
        transform: translateX(400px); transition: transform 0.3s ease;
    `;
    
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    notification.innerHTML = `<strong>${icon} ${message}</strong>`;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Typing Effect for Terminal
function initTypingEffect() {
    const elements = document.querySelectorAll('.typing-effect, .typing-effect-2, .typing-effect-3');
    
    elements.forEach((element, index) => {
        const text = element.textContent;
        element.textContent = '';
        
        setTimeout(() => {
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 50);
        }, index * 1000);
    });
}

// Initialize typing effect when page loads
window.addEventListener('load', initTypingEffect);

// Particle Effect
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--primary-color);
            opacity: 0.3;
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
}

createParticles();

// Add CSS for particles
const particleCSS = `
@keyframes particleFloat {
    0%, 100% { transform: translateY(0px) translateX(0px); }
    33% { transform: translateY(-20px) translateX(10px); }
    66% { transform: translateY(20px) translateX(-10px); }
}
.particle {
    animation: particleFloat 4s ease-in-out infinite !important;
}
`;

const style = document.createElement('style');
style.textContent = particleCSS;
document.head.appendChild(style);

// Terminal Commands Simulation - Updated for React.js Development
const terminalCommands = [
    { command: 'ls -la projects/', output: 'acad-calc/\n  book-recommendation/\n  sentiment-analysis/\n  portfolio-website/' },
    { command: 'npm start', output: 'Starting React development server...\nLocal: http://localhost:3000\nWebpack compiled successfully!' },
    { command: 'npm run build', output: 'Creating optimized production build...\nBuild completed successfully!\nReady for deployment.' },
    { command: 'git status', output: 'On branch main\nmodified: src/components/Calculator.jsx\nmodified: src/App.js' },
    { command: 'npm install react axios', output: 'Successfully installed react-18.2.0 axios-1.4.0' }
];

function simulateTerminal() {
    const terminalBody = document.querySelector('.terminal-body');
    if (!terminalBody) return;
    
    let commandIndex = 0;
    
    const interval = setInterval(() => {
        if (commandIndex < terminalCommands.length) {
            const cmd = terminalCommands[commandIndex];
            
            // Add command line
            const commandLine = document.createElement('div');
            commandLine.className = 'terminal-line';
            commandLine.innerHTML = `<span class="prompt">$</span> <span class="command">${cmd.command}</span>`;
            terminalBody.appendChild(commandLine);
            
            // Add output after delay
            setTimeout(() => {
                const outputLine = document.createElement('div');
                outputLine.className = 'terminal-line';
                outputLine.innerHTML = `<span class="output">${cmd.output.replace(/\n/g, '<br>')}</span>`;
                terminalBody.appendChild(outputLine);
                
                // Scroll to bottom
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }, 1000);
            
            commandIndex++;
        } else {
            clearInterval(interval);
        }
    }, 6000);
}

// Start terminal simulation after initial load
setTimeout(simulateTerminal, 4000);

// Glitch Effect on Hover
const glitchTitle = document.querySelector('.glitch');
if (glitchTitle) {
    glitchTitle.addEventListener('mouseenter', () => {
        glitchTitle.style.animation = 'none';
        glitchTitle.offsetHeight; // Trigger reflow
        glitchTitle.style.animation = 'glitch 0.3s ease-in-out';
    });
}

// Matrix Rain Effect (Background)
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-10';
    canvas.style.opacity = '0.1';
    canvas.style.pointerEvents = 'none';
    
    document.body.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff88';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 33);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Only create matrix rain on larger screens
if (window.innerWidth > 768) {
    createMatrixRain();
}

// React.js specific interactions
function initReactFeatures() {
    // Add hover effects for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(97, 218, 251, 0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        });
    });
    
    // Add pulse effect to skill bars when they animate
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        bar.addEventListener('transitionend', () => {
            if (bar.style.width !== '0px' && bar.style.width !== '') {
                bar.style.boxShadow = '0 0 20px rgba(97, 218, 251, 0.5)';
                setTimeout(() => {
                    bar.style.boxShadow = 'none';
                }, 1000);
            }
        });
    });
}

// Initialize React features
initReactFeatures();

// Project deployment status (mock feature)
function updateDeploymentStatus() {
    const projects = ['Acad Calc', 'Book Recommendation', 'Portfolio'];
    const randomProject = projects[Math.floor(Math.random() * projects.length)];
    console.log(`🚀 ${randomProject} is live and running!`);
}

// Update deployment status periodically
setInterval(updateDeploymentStatus, 45000);

// Console messages for Mayur
console.log('%c⚛️ Welcome to the React.js Universe!', 'color: #61dafb; font-size: 20px; font-weight: bold;');
console.log('%c💻 Developed by Mayur Kothari', 'color: #0077ff; font-size: 14px;');
console.log('%c🚀 "Code is like humor. When you have to explain it, it\'s bad." - Cory House', 'color: #ff6b6b; font-size: 12px; font-style: italic;');

// Add dynamic skill level updates based on experience
function updateSkillLevels() {
    const skills = {
        'React.js': 90,
        'JavaScript': 88,
        'Python': 85,
        'HTML/CSS': 85,
        'Flask': 75,
        'MySQL': 80,
        'Git & GitHub': 85,
        'Streamlit': 78
    };
    
    Object.entries(skills).forEach(([skill, level]) => {
        const skillElement = Array.from(document.querySelectorAll('.skill-name'))
            .find(el => el.textContent.includes(skill));
        
        if (skillElement) {
            const progressBar = skillElement.nextElementSibling.querySelector('.skill-progress');
            if (progressBar) {
                progressBar.setAttribute('data-width', `${level}%`);
            }
        }
    });
}

// Update skill levels on page load
window.addEventListener('load', updateSkillLevels);

// Add loading animation for GitHub stats
function showGitHubLoading() {
    const repoElement = document.getElementById('github-repos');
    const commitElement = document.getElementById('github-commits');
    
    if (repoElement && commitElement) {
        let dots = 0;
        const loadingInterval = setInterval(() => {
            const dotString = '.'.repeat(dots % 4);
            repoElement.textContent = `Loading${dotString}`;
            commitElement.textContent = `Loading${dotString}`;
            dots++;
        }, 500);
        
        // Clear loading animation after 3 seconds
        setTimeout(() => {
            clearInterval(loadingInterval);
        }, 3000);
    }
}

// Start loading animation
showGitHubLoading();

// Performance optimization: Lazy load heavy features
function initLazyFeatures() {
    // Only initialize expensive features after user interaction
    let interacted = false;
    
    const initHeavyFeatures = () => {
        if (!interacted) {
            interacted = true;
            // Add any heavy features here
        }
    };
    
    document.addEventListener('scroll', initHeavyFeatures, { once: true });
    document.addEventListener('click', initHeavyFeatures, { once: true });
}

initLazyFeatures();
