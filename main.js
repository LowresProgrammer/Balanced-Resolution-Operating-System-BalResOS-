// Button functionality
document.addEventListener('DOMContentLoaded', function() {
    // Download Button
    document.querySelector('.download-btn').addEventListener('click', function(e) {
        e.preventDefault();
        showDownloadModal();
    });

    // Watch Demo Button
    document.querySelector('.btn.secondary-btn').addEventListener('click', function(e) {
        e.preventDefault();
        showVideoModal();
    });

    // Join Beta Now Button
    document.querySelector('.action-btn').addEventListener('click', function(e) {
        e.preventDefault();
        showBetaSignupForm();
    });

    // Learn More Buttons (all feature buttons)
    document.querySelectorAll('.feature-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const featureTitle = this.closest('.feature-item').querySelector('h3').textContent;
            showFeatureDetails(featureTitle);
        });
    });

    // View All Features Button
    document.querySelectorAll('.btn').forEach(button => {
        if (button.textContent.includes('View All Features')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showAllFeatures();
            });
        }
    });

    // Compare Editions Button
    document.querySelectorAll('.btn').forEach(button => {
        if (button.textContent.includes('Compare Editions')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showEditionComparison();
            });
        }
    });

    // Join Beta Button in Performance Section
    document.querySelectorAll('.btn').forEach(button => {
        if (button.textContent.includes('Join the Beta')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showBetaWaitlist();
            });
        }
    });

    // System Requirements Button
    document.querySelectorAll('.btn').forEach(button => {
        if (button.textContent.includes('System Requirements')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showSystemRequirements();
            });
        }
    });

    // Social Media Buttons
    document.querySelectorAll('.social-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = button.textContent;
            handleSocialClick(platform);
        });
    });

    // Footer Buttons (Privacy, Terms, Support)
    document.querySelectorAll('footer .social-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const page = button.textContent;
            showLegalPage(page);
        });
    });

    // Clear Form Button
    document.querySelector('button[type="reset"]').addEventListener('click', function(e) {
        e.preventDefault();
        clearContactForm();
    });
});

// Modal functions
function showDownloadModal() {
    const modal = createModal(`
        <h3>Download GameOS</h3>
        <div class="download-options">
            <div class="download-option">
                <h4>🎮 GameOS Pro</h4>
                <p>Full version with all features</p>
                <button class="btn download-option-btn" data-version="pro">Download (2.1 GB)</button>
            </div>
            <div class="download-option">
                <h4>⚡ GameOS Lite</h4>
                <p>Lightweight version for older hardware</p>
                <button class="btn secondary-btn download-option-btn" data-version="lite">Download (1.4 GB)</button>
            </div>
        </div>
        <p style="margin-top: 20px; font-size: 0.9rem; color: #888;">
            System requirements: Windows 10/11, 8GB RAM, 10GB storage
        </p>
    `);
    
    // Add event listeners to download buttons inside modal
    modal.querySelectorAll('.download-option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const version = this.getAttribute('data-version');
            startDownload(version);
        });
    });
}

function showVideoModal() {
    const modal = createModal(`
        <h3>GameOS Demo</h3>
        <div class="video-placeholder">
            <div style="background: #1a1a3a; padding: 100px 20px; border-radius: 10px; margin: 20px 0;">
                <p style="font-size: 1.2rem; color: #00ffff;">🎬 Video Player</p>
                <p style="color: #888; margin-top: 10px;">GameOS performance demonstration video</p>
            </div>
        </div>
        <button class="btn" id="playDemo">Play Demo Video</button>
    `);
    
    modal.querySelector('#playDemo').addEventListener('click', function() {
        this.textContent = 'Playing...';
        setTimeout(() => {
            alert('Demo video would play here!');
        }, 1000);
    });
}

function showBetaSignupForm() {
    const modal = createModal(`
        <h3>Join GameOS Beta</h3>
        <form class="beta-form">
            <input type="email" placeholder="Your Email" required>
            <select required>
                <option value="">Select Your Platform</option>
                <option value="windows">Windows</option>
                <option value="linux">Linux</option>
                <option value="mac">macOS</option>
            </select>
            <textarea placeholder="Why do you want to join the beta? (optional)" rows="3"></textarea>
            <div class="button-container">
                <button type="submit" class="btn">Join Beta</button>
                <button type="button" class="btn secondary-btn close-modal">Cancel</button>
            </div>
        </form>
    `);
    
    modal.querySelector('.beta-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for applying to the GameOS Beta! We\'ll contact you soon.');
        closeModal();
    });
}

function showFeatureDetails(featureTitle) {
    const featureDetails = {
        'Ultra-Low Latency Kernel': {
            description: 'Our custom kernel reduces input latency by up to 70% compared to standard operating systems.',
            specs: ['Custom scheduler', 'Real-time process management', 'Hardware-optimized drivers'],
            requirements: 'Compatible with all modern hardware'
        },
        'Dynamic Resource Allocation': {
            description: 'Intelligently allocates CPU and GPU resources to prioritize gaming performance.',
            specs: ['AI-powered resource management', 'Automatic background process management', 'Real-time performance monitoring'],
            requirements: 'Requires multi-core processor'
        },
        'One-Click E-Sports Mode': {
            description: 'Instantly optimize your system for competitive gaming with a single click.',
            specs: ['Network traffic prioritization', 'System notification blocking', 'Performance profile switching'],
            requirements: 'Internet connection required for updates'
        },
        'Integrated Social Hub': {
            description: 'Built-in communication tools with zero performance overhead.',
            specs: ['Low-latency voice chat', 'Streaming integration', 'Cross-platform messaging'],
            requirements: 'Microphone and speakers recommended'
        },
        'Peripherals-First Manager': {
            description: 'Advanced driver management for gaming peripherals.',
            specs: ['Auto-driver updates', 'Custom profile storage', 'Hardware performance tuning'],
            requirements: 'Supports 1000+ gaming devices'
        }
    };
    
    const feature = featureDetails[featureTitle] || {
        description: 'Detailed information about this feature.',
        specs: ['Feature specification 1', 'Feature specification 2'],
        requirements: 'Standard system requirements'
    };
    
    const modal = createModal(`
        <h3>${featureTitle}</h3>
        <p>${feature.description}</p>
        <div class="feature-specs">
            <h4>Key Features:</h4>
            <ul>
                ${feature.specs.map(spec => `<li>${spec}</li>`).join('')}
            </ul>
        </div>
        <p><strong>Requirements:</strong> ${feature.requirements}</p>
        <div class="button-container">
            <button class="btn">Enable Feature</button>
            <button class="btn secondary-btn close-modal">Close</button>
        </div>
    `);
}

function showAllFeatures() {
    const modal = createModal(`
        <h3>All GameOS Features</h3>
        <div class="features-list">
            <div class="feature-category">
                <h4>🎯 Performance</h4>
                <ul>
                    <li>Ultra-Low Latency Kernel</li>
                    <li>Dynamic Resource Allocation</li>
                    <li>GPU Optimization Suite</li>
                    <li>Memory Compression</li>
                </ul>
            </div>
            <div class="feature-category">
                <h4>⚡ Gaming</h4>
                <ul>
                    <li>One-Click E-Sports Mode</li>
                    <li>Game Library Manager</li>
                    <li>Performance Overlays</li>
                    <li>Auto-Game Optimization</li>
                </ul>
            </div>
            <div class="feature-category">
                <h4>🔧 System</h4>
                <ul>
                    <li>Peripherals-First Manager</li>
                    <li>System Health Monitor</li>
                    <li>Auto-Driver Updates</li>
                    <li>Backup & Recovery</li>
                </ul>
            </div>
        </div>
    `);
}

function showEditionComparison() {
    const modal = createModal(`
        <h3>GameOS Editions Comparison</h3>
        <div class="comparison-table">
            <table>
                <thead>
                    <tr>
                        <th>Feature</th>
                        <th>Lite</th>
                        <th>Pro</th>
                        <th>Ultimate</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Performance Boost</td><td>✅</td><td>✅</td><td>✅</td></tr>
                    <tr><td>E-Sports Mode</td><td>✅</td><td>✅</td><td>✅</td></tr>
                    <tr><td>Advanced Optimization</td><td>❌</td><td>✅</td><td>✅</td></tr>
                    <tr><td>Priority Support</td><td>❌</td><td>✅</td><td>✅</td></tr>
                    <tr><td>Cloud Profiles</td><td>❌</td><td>❌</td><td>✅</td></tr>
                    <tr><td>Price</td><td>Free</td><td>$29.99</td><td>$59.99</td></tr>
                </tbody>
            </table>
        </div>
    `);
}

function showBetaWaitlist() {
    const modal = createModal(`
        <h3>Join Beta Waitlist</h3>
        <p>Get early access to GameOS features before anyone else!</p>
        <form class="waitlist-form">
            <input type="email" placeholder="Your Email" required>
            <input type="text" placeholder="Gaming Platform (Steam, Epic, etc.)">
            <div class="button-container">
                <button type="submit" class="btn">Join Waitlist</button>
            </div>
        </form>
        <p style="font-size: 0.9rem; color: #888; margin-top: 20px;">
            You'll receive beta access within 48 hours.
        </p>
    `);
    
    modal.querySelector('.waitlist-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('You\'ve been added to the beta waitlist! Check your email for confirmation.');
        closeModal();
    });
}

function showSystemRequirements() {
    const modal = createModal(`
        <h3>System Requirements</h3>
        <div class="requirements">
            <div class="requirement-category">
                <h4>Minimum Requirements</h4>
                <ul>
                    <li>OS: Windows 10 64-bit</li>
                    <li>CPU: Intel i5 or AMD Ryzen 5</li>
                    <li>RAM: 8GB DDR4</li>
                    <li>Storage: 10GB available space</li>
                    <li>GPU: DirectX 12 compatible</li>
                </ul>
            </div>
            <div class="requirement-category">
                <h4>Recommended Requirements</h4>
                <ul>
                    <li>OS: Windows 11 64-bit</li>
                    <li>CPU: Intel i7 or AMD Ryzen 7</li>
                    <li>RAM: 16GB DDR4</li>
                    <li>Storage: 20GB SSD</li>
                    <li>GPU: NVIDIA RTX 3060 or equivalent</li>
                </ul>
            </div>
        </div>
    `);
}

function handleSocialClick(platform) {
    const socialLinks = {
        'Discord Community': 'https://discord.gg/gameos',
        'Twitter': 'https://twitter.com/gameos',
        'YouTube': 'https://youtube.com/gameos',
        'Privacy Policy': '#privacy',
        'Terms of Service': '#terms',
        'Support': '#support'
    };
    
    const url = socialLinks[platform];
    if (url.startsWith('http')) {
        window.open(url, '_blank');
    } else {
        // For internal pages, show a modal
        showLegalPage(platform);
    }
}

function showLegalPage(page) {
    const content = {
        'Privacy Policy': 'We respect your privacy. GameOS collects minimal usage data to improve performance...',
        'Terms of Service': 'By using GameOS, you agree to our terms of service...',
        'Support': 'Contact our support team at support@gameos.com or visit our knowledge base.'
    };
    
    const modal = createModal(`
        <h3>${page}</h3>
        <div class="legal-content">
            <p>${content[page]}</p>
        </div>
    `);
}

function clearContactForm() {
    document.querySelector('form').reset();
    showNotification('Form cleared!', 'success');
}

// Utility functions
function createModal(content) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            ${content}
        </div>
    `;
    
    document.body.appendChild(modalOverlay);
    
    // Add close functionality
    modalOverlay.querySelector('.modal-close').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    return modalOverlay.querySelector('.modal-content');
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

function startDownload(version) {
    showNotification(`Starting download: GameOS ${version}`, 'info');
    // Simulate download
    setTimeout(() => {
        showNotification('Download complete!', 'success');
        closeModal();
    }, 2000);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff0080' : '#00ffff'};
        color: #0a0a1a;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        font-weight: bold;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Rest of your existing JavaScript code (scroll animations, form handling, etc.)
// ... (keep all the existing code from previous responses)

// NAV: manage active link on click and on scroll
document.addEventListener('DOMContentLoaded', function () {
    const nav = document.querySelector('nav.nav__menu');
    if (!nav) return;
    const navLinks = Array.from(nav.querySelectorAll('a[href^="#"]'));

    // Remove any pre-existing active classes (defensive)
    navLinks.forEach(l => l.classList.remove('active-link'));

    // Click -> set active immediately
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active-link'));
            link.classList.add('active-link');
        });
    });

    // Scroll -> use IntersectionObserver to update the active link based on visible section
    const sections = navLinks
        .map(l => document.querySelector(l.getAttribute('href')))
        .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = `#${entry.target.id}`;
                    navLinks.forEach(l => l.classList.remove('active-link'));
                    const active = nav.querySelector(`a[href="${id}"]`);
                    if (active) active.classList.add('active-link');
                }
            });
        }, { root: null, rootMargin: '0px 0px -40% 0px', threshold: 0.15 });

        sections.forEach(s => observer.observe(s));
    } else {
        // Fallback: on scroll, compute closest section
        window.addEventListener('scroll', () => {
            let closest = null;
            let minDist = Infinity;
            sections.forEach(s => {
                const rect = s.getBoundingClientRect();
                const dist = Math.abs(rect.top - window.innerHeight / 4);
                if (dist < minDist) {
                    minDist = dist;
                    closest = s;
                }
            });
            if (closest) {
                const id = `#${closest.id}`;
                navLinks.forEach(l => l.classList.remove('active-link'));
                const active = nav.querySelector(`a[href="${id}"]`);
                if (active) active.classList.add('active-link');
            }
        }, { passive: true });
    }
});

// Rotating typing animation for header words
;(function() {
    const phrases = [
        'Ultimate Gaming Performance',
        'Zero Latency Experience',
        'E-Sports Ready System',
        'Hardware Optimization',
        'BalResOS Revolution'
    ];

    const el = document.getElementById('rotating-words');
    if (!el) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let typing = true;

    function tick() {
        const current = phrases[phraseIndex];
        if (typing) {
            charIndex++;
            el.textContent = current.slice(0, charIndex);
            if (charIndex >= current.length) {
                typing = false;
                setTimeout(tick, 1400);
            } else {
                setTimeout(tick, 80);
            }
        } else {
            charIndex--;
            el.textContent = current.slice(0, charIndex);
            if (charIndex <= 0) {
                typing = true;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(tick, 300);
            } else {
                setTimeout(tick, 40);
            }
        }
    }

    // start after small delay so header layout finishes
    setTimeout(tick, 600);
})();