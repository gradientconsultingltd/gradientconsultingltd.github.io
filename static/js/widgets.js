// GradientXchange Widget Functionality

// Exchange rates (mock data for demonstration)
const exchangeRates = {
    'btc': {
        'zar': 1200000,  // 1 BTC = 1,200,000 ZAR
        'kes': 6800000   // 1 BTC = 6,800,000 KES
    },
    'eth': {
        'zar': 85000,    // 1 ETH = 85,000 ZAR
        'kes': 480000    // 1 ETH = 480,000 KES
    },
    'usdc': {
        'zar': 18.15,    // 1 USDC = 18.15 ZAR
        'kes': 128.50    // 1 USDC = 128.50 KES
    },
    'usdt': {
        'zar': 18.20,    // 1 USDT = 18.20 ZAR
        'kes': 128.80    // 1 USDT = 128.80 KES
    },
    'sol': {
        'zar': 3500,     // 1 SOL = 3,500 ZAR
        'kes': 19750     // 1 SOL = 19,750 KES
    }
};

// Currency symbols
const currencySymbols = {
    'btc': 'BTC',
    'eth': 'ETH',
    'usdc': 'USDC',
    'usdt': 'USDT',
    'sol': 'SOL'
};

// Initialize widgets when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWidgets();
    setupEventListeners();
    addAnimations();
});

function initializeWidgets() {
    // Check if interactive widgets exist before initializing
    const onrampAmount = document.getElementById('onramp-amount');
    const offrampAmount = document.getElementById('offramp-amount');
    
    if (onrampAmount) {
        updateOnRampCalculation();
    }
    
    if (offrampAmount) {
        updateOffRampCalculation();
    }
    
    console.log('Widgets initialized successfully');
}

function setupEventListeners() {
    // On-ramp widget event listeners
    const onrampAmount = document.getElementById('onramp-amount');
    const onrampCrypto = document.getElementById('onramp-crypto');
    
    if (onrampAmount) {
        onrampAmount.addEventListener('input', updateOnRampCalculation);
    }
    
    if (onrampCrypto) {
        onrampCrypto.addEventListener('change', updateOnRampCalculation);
    }
    
    // Off-ramp widget event listeners
    const offrampAmount = document.getElementById('offramp-amount');
    const offrampCrypto = document.getElementById('offramp-crypto');
    
    if (offrampAmount) {
        offrampAmount.addEventListener('input', updateOffRampCalculation);
    }
    
    if (offrampCrypto) {
        offrampCrypto.addEventListener('change', updateOffRampCalculation);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

function updateOnRampCalculation() {
    const amountInput = document.getElementById('onramp-amount');
    const cryptoSelect = document.getElementById('onramp-crypto');
    const resultElement = document.getElementById('onramp-result');
    
    if (!amountInput || !cryptoSelect || !resultElement) {
        console.error('On-ramp widget elements not found');
        return;
    }
    
    const zarAmount = parseFloat(amountInput.value) || 0;
    const selectedCrypto = cryptoSelect.value;
    
    if (zarAmount <= 0) {
        resultElement.textContent = '≈ 0 ' + currencySymbols[selectedCrypto];
        return;
    }
    
    const rate = exchangeRates[selectedCrypto]?.zar || 1;
    const cryptoAmount = zarAmount / rate;
    
    // Format the result based on crypto type
    let formattedAmount;
    if (selectedCrypto === 'btc') {
        formattedAmount = cryptoAmount.toFixed(6);
    } else if (selectedCrypto === 'eth') {
        formattedAmount = cryptoAmount.toFixed(4);
    } else {
        formattedAmount = cryptoAmount.toFixed(2);
    }
    
    resultElement.textContent = `≈ ${formattedAmount} ${currencySymbols[selectedCrypto]}`;
    
    // Update rate display
    const rateText = document.querySelector('#onramp-result').parentElement.querySelector('small');
    if (rateText) {
        rateText.textContent = `Rate: 1 ${currencySymbols[selectedCrypto]} = ${rate.toLocaleString()} ZAR`;
    }
    
    // Add animation
    resultElement.classList.add('fade-in');
    setTimeout(() => resultElement.classList.remove('fade-in'), 600);
}

function updateOffRampCalculation() {
    const amountInput = document.getElementById('offramp-amount');
    const cryptoSelect = document.getElementById('offramp-crypto');
    const resultElement = document.getElementById('offramp-result');
    
    if (!amountInput || !cryptoSelect || !resultElement) {
        console.error('Off-ramp widget elements not found');
        return;
    }
    
    const cryptoAmount = parseFloat(amountInput.value) || 0;
    const selectedCrypto = cryptoSelect.value;
    
    if (cryptoAmount <= 0) {
        resultElement.textContent = '≈ 0 KES';
        return;
    }
    
    const rate = exchangeRates[selectedCrypto]?.kes || 1;
    const kesAmount = cryptoAmount * rate;
    
    resultElement.textContent = `≈ ${kesAmount.toLocaleString()} KES`;
    
    // Update rate display
    const rateText = document.querySelector('#offramp-result').parentElement.querySelector('small');
    if (rateText) {
        rateText.textContent = `Rate: 1 ${currencySymbols[selectedCrypto]} = ${rate.toLocaleString()} KES`;
    }
    
    // Add animation
    resultElement.classList.add('fade-in');
    setTimeout(() => resultElement.classList.remove('fade-in'), 600);
}

function simulateTransaction(type) {
    const button = event.target;
    const originalText = button.textContent;
    
    // Add loading state
    button.classList.add('loading');
    button.disabled = true;
    button.textContent = 'Processing...';
    
    // Simulate API call delay
    setTimeout(() => {
        // Remove loading state
        button.classList.remove('loading');
        button.disabled = false;
        button.textContent = originalText;
        
        // Show success message
        showNotification(
            type === 'onramp' 
                ? 'Transaction initiated! You will be redirected to complete payment.' 
                : 'Sell order placed! Funds will be transferred to your account.',
            'success'
        );
        
        console.log(`${type} transaction simulated successfully`);
    }, 2000);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : 'info'} alert-dismissible fade show`;
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add to flash messages container or create one
    let container = document.querySelector('.flash-messages');
    if (!container) {
        container = document.createElement('div');
        container.className = 'flash-messages';
        document.body.appendChild(container);
    }
    
    container.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function addAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.widget-card, .crypto-item, .feature-item').forEach(el => {
        observer.observe(el);
    });
}

// Utility function to format currency
function formatCurrency(amount, currency = 'USD', decimals = 2) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(amount);
}

// Utility function to validate input
function validateInput(input, min = 0, max = Infinity) {
    const value = parseFloat(input.value);
    
    if (isNaN(value) || value < min || value > max) {
        input.classList.add('is-invalid');
        return false;
    } else {
        input.classList.remove('is-invalid');
        return true;
    }
}

// Contact form enhancement
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Add loading state to submit button
            const submitBtn = contactForm.querySelector('input[type="submit"]');
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.value = 'Sending...';
            }
        });
    }
});

// Export functions for potential external use
window.GradientXchange = {
    updateOnRampCalculation,
    updateOffRampCalculation,
    simulateTransaction,
    showNotification,
    formatCurrency,
    validateInput
};

console.log('GradientXchange widgets loaded successfully');
