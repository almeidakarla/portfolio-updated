// Lumio Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Hero Value Selector
    initHeroValueSelector();
    
    // Pricing Calculator
    initPricingCalculator();
    
    // FAQ Accordion
    initFAQAccordion();
    
    // Mobile Menu
    initMobileMenu();
    
    // Smooth scroll for anchor links
    initSmoothScroll();
});

// Hero Value Selector
function initHeroValueSelector() {
    const heroValueDisplay = document.getElementById('heroValue');
    const minusBtn = document.querySelector('.value-btn.minus');
    const plusBtn = document.querySelector('.value-btn.plus');
    
    if (!heroValueDisplay || !minusBtn || !plusBtn) return;
    
    let currentValue = 400;
    const minValue = 100;
    const maxValue = 500;
    const step = 50;
    
    function updateDisplay() {
        heroValueDisplay.textContent = currentValue;
    }
    
    minusBtn.addEventListener('click', function() {
        if (currentValue > minValue) {
            currentValue -= step;
            updateDisplay();
        }
    });
    
    plusBtn.addEventListener('click', function() {
        if (currentValue < maxValue) {
            currentValue += step;
            updateDisplay();
        }
    });
}

// Pricing Calculator
function initPricingCalculator() {
    const priceButtons = document.querySelectorAll('.price-btn');
    const creditValueEl = document.getElementById('creditValue');
    const financingAmountEl = document.getElementById('financingAmount');
    const othersAmountEl = document.getElementById('othersAmount');
    const lumioAmountEl = document.getElementById('lumioAmount');
    const financingBar = document.querySelector('.chart-bar.financing');
    const othersBar = document.querySelector('.chart-bar.others');
    const lumioBar = document.querySelector('.chart-bar.lumio');
    
    if (!priceButtons.length || !creditValueEl) return;
    
    // Pricing data based on the reference images
    const pricingData = {
        150000: {
            financing: { amount: 108248, percent: 73, barWidth: 100 },
            others: { amount: 34200, percent: 23, barWidth: 45 },
            lumio: { amount: 22500, percent: 15, barWidth: 20 }
        },
        200000: {
            financing: { amount: 144331, percent: 73, barWidth: 100 },
            others: { amount: 45600, percent: 23, barWidth: 45 },
            lumio: { amount: 30000, percent: 15, barWidth: 20 }
        },
        250000: {
            financing: { amount: 180413, percent: 73, barWidth: 100 },
            others: { amount: 57000, percent: 23, barWidth: 45 },
            lumio: { amount: 34500, percent: 13, barWidth: 20 }
        },
        300000: {
            financing: { amount: 216496, percent: 73, barWidth: 100 },
            others: { amount: 68400, percent: 23, barWidth: 45 },
            lumio: { amount: 40500, percent: 13, barWidth: 20 }
        },
        350000: {
            financing: { amount: 252578, percent: 73, barWidth: 100 },
            others: { amount: 79800, percent: 23, barWidth: 45 },
            lumio: { amount: 45000, percent: 12, barWidth: 20 }
        },
        400000: {
            financing: { amount: 288661, percent: 73, barWidth: 100 },
            others: { amount: 91200, percent: 23, barWidth: 45 },
            lumio: { amount: 52500, percent: 13, barWidth: 20 }
        }
    };
    
    function formatCurrency(value) {
        return value.toLocaleString('pt-BR');
    }
    
    function updateChart(creditAmount) {
        const data = pricingData[creditAmount];
        if (!data) return;
        
        // Update credit value display
        creditValueEl.textContent = formatCurrency(creditAmount);
        
        // Update amounts
        financingAmountEl.textContent = 'R$ ' + formatCurrency(data.financing.amount);
        othersAmountEl.textContent = 'R$ ' + formatCurrency(data.others.amount);
        lumioAmountEl.textContent = 'R$ ' + formatCurrency(data.lumio.amount);
        
        // Update bar widths with animation
        if (financingBar) financingBar.style.width = data.financing.barWidth + '%';
        if (othersBar) othersBar.style.width = data.others.barWidth + '%';
        if (lumioBar) lumioBar.style.width = data.lumio.barWidth + '%';
        
        // Update percent tags
        const financingTag = document.querySelector('.financing-tag');
        const othersTag = document.querySelector('.others-tag');
        const lumioTag = document.querySelector('.lumio-tag');
        
        if (financingTag) financingTag.textContent = data.financing.percent + '% de taxa';
        if (othersTag) othersTag.textContent = data.others.percent + '% de taxa';
        if (lumioTag) lumioTag.textContent = data.lumio.percent + '% de taxa';
    }
    
    priceButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            priceButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get value and update chart
            const value = parseInt(this.dataset.value);
            updateChart(value);
        });
    });
}

// FAQ Accordion
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isOpen = item.classList.contains('open');
            
            // Close all items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('open');
            });
            
            // Open clicked item if it wasn't open
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    const headerActions = document.querySelector('.header-actions');
    
    if (!menuBtn) return;
    
    menuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        
        // Toggle mobile navigation visibility
        if (nav) nav.classList.toggle('mobile-open');
        if (headerActions) headerActions.classList.toggle('mobile-open');
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add scroll-based header styling
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Stop widget scrolling at "how-it-works" section (desktop only)
    const fixedWidget = document.getElementById('fixedWidget');
    const howItWorksSection = document.querySelector('.how-it-works');

    if (fixedWidget && howItWorksSection && window.innerWidth > 768) {
        const headerHeight = 72; // var(--header-height)
        const fixedTopOffset = 40; // Fixed widget top offset from header
        const additionalOffset = 300; // ADJUST THIS VALUE: increase to make widget go down more (in pixels)

        // Get the position where the how-it-works section starts
        const sectionOffsetTop = howItWorksSection.offsetTop;
        const currentScroll = window.scrollY;

        // Calculate the stop position (when widget reaches the section)
        const stopScrollPosition = sectionOffsetTop - headerHeight - fixedTopOffset + additionalOffset;

        // If scrolled past the stop position, make it stick at that position
        if (currentScroll >= stopScrollPosition) {
            fixedWidget.classList.add('stuck');
            // Calculate the absolute top position where it should stay
            const stuckTop = stopScrollPosition + headerHeight + fixedTopOffset;
            fixedWidget.style.top = stuckTop + 'px';
        } else {
            fixedWidget.classList.remove('stuck');
            fixedWidget.style.top = ''; // Reset to CSS default
        }
    } else if (fixedWidget && window.innerWidth <= 768) {
        // Ensure stuck class is removed on mobile
        fixedWidget.classList.remove('stuck');
        fixedWidget.style.top = '';
    }
});

// ============================================
// SIMULATOR PAGE FUNCTIONS
// ============================================

function initSimulator() {
    // Check if we're on the simulator page
    const simulator = document.querySelector('.simulator');
    if (!simulator) return;
    
    // State
    let currentStep = 1;
    let creditAmount = 400000;
    let planAmount = 150000;
    let selectedTerm = 60;
    let userName = '';
    
    // DOM Elements
    const steps = document.querySelectorAll('.step');
    const backBtn = document.getElementById('backBtn');
    const successModal = document.getElementById('successModal');
    const chatWidget = document.getElementById('chatWidget');
    
    // Initialize all simulator functions
    setupCreditSelector();
    setupPlanBuilder();
    setupInputValidation();
    setupNavigation();
    setupFormSubmission();
    setupPEPButtons();
    setupPhoneMask();
    setupCurrencyMask();
    setupCPFMask();
    setupDateMask();
    setupCEPMask();
    
    // Show chat widget after delay
    setTimeout(() => {
        if (chatWidget) chatWidget.classList.add('visible');
    }, 3000);
    
    // Step Navigation
    function goToStep(step) {
        steps.forEach(s => s.classList.remove('active'));
        const targetStep = document.querySelector(`[data-step="${step}"]`);
        if (targetStep) {
            targetStep.classList.add('active');
            currentStep = step;
            
            // Show/hide back button
            backBtn.style.visibility = step > 1 ? 'visible' : 'hidden';
            
            // Update user name display on step 3
            if (step === 3) {
                const nameDisplay = document.getElementById('userNameDisplay');
                if (nameDisplay && userName) {
                    nameDisplay.textContent = userName.split(' ')[0];
                }
            }
            
            // Pre-fill income on step 6
            if (step === 6) {
                const incomeConfirm = document.getElementById('userIncomeConfirm');
                const income = document.getElementById('userIncome');
                if (incomeConfirm && income && income.value) {
                    incomeConfirm.value = income.value;
                }
                
                // Pre-fill name
                const fullNameInput = document.getElementById('fullName');
                if (fullNameInput && userName) {
                    fullNameInput.value = userName;
                }
            }
        }
    }
    
    function setupNavigation() {
        // Next buttons
        document.querySelectorAll('[data-next]').forEach(btn => {
            btn.addEventListener('click', function() {
                if (this.disabled) return;
                const nextStep = parseInt(this.dataset.next);
                goToStep(nextStep);
            });
        });
        
        // Back button
        if (backBtn) {
            backBtn.addEventListener('click', function() {
                if (currentStep > 1) {
                    goToStep(currentStep - 1);
                }
            });
        }
    }
    
    // Credit Amount Selector (Step 1)
    function setupCreditSelector() {
        const amountDisplay = document.getElementById('creditAmount');
        const minusBtn = document.querySelector('[data-action="decrease"]');
        const plusBtn = document.querySelector('[data-action="increase"]');
        
        if (!amountDisplay || !minusBtn || !plusBtn) return;
        
        function updateCreditDisplay() {
            amountDisplay.textContent = creditAmount.toLocaleString('pt-BR');
        }
        
        minusBtn.addEventListener('click', function() {
            if (creditAmount > 200000) {
                creditAmount -= 100000;
                updateCreditDisplay();
            }
        });
        
        plusBtn.addEventListener('click', function() {
            if (creditAmount < 2000000) {
                creditAmount += 100000;
                updateCreditDisplay();
            }
        });
    }
    
    // Plan Builder (Step 4)
    function setupPlanBuilder() {
        const planAmountDisplay = document.getElementById('planAmount');
        const monthlyDisplay = document.getElementById('monthlyAmount');
        const minusPlanBtn = document.querySelector('[data-action="decrease-plan"]');
        const plusPlanBtn = document.querySelector('[data-action="increase-plan"]');
        const termBtns = document.querySelectorAll('.term-btn');
        
        if (!planAmountDisplay || !monthlyDisplay) return;
        
        function calculateMonthly() {
            const rate = 0.015;
            const monthly = (planAmount * (1 + rate)) / selectedTerm;
            return monthly;
        }
        
        function updatePlanDisplay() {
            planAmountDisplay.textContent = planAmount.toLocaleString('pt-BR');
            const monthly = calculateMonthly();
            monthlyDisplay.textContent = monthly.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }
        
        if (minusPlanBtn) {
            minusPlanBtn.addEventListener('click', function() {
                if (planAmount > 150000) {
                    planAmount -= 50000;
                    updatePlanDisplay();
                }
            });
        }
        
        if (plusPlanBtn) {
            plusPlanBtn.addEventListener('click', function() {
                if (planAmount < 2000000) {
                    planAmount += 50000;
                    updatePlanDisplay();
                }
            });
        }
        
        termBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                termBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                selectedTerm = parseInt(this.dataset.term);
                updatePlanDisplay();
            });
        });
        
        updatePlanDisplay();
    }
    
    // Input Validation
    function setupInputValidation() {
        // Name input (Step 2)
        const nameInput = document.getElementById('userName');
        const nameNextBtn = document.getElementById('nameNextBtn');
        
        if (nameInput && nameNextBtn) {
            nameInput.addEventListener('input', function() {
                const isValid = this.value.trim().length >= 2;
                nameNextBtn.disabled = !isValid;
                nameNextBtn.classList.toggle('btn-disabled', !isValid);
                userName = this.value.trim();
            });
        }
        
        // Phone input (Step 3)
        const phoneInput = document.getElementById('userPhone');
        const phoneNextBtn = document.getElementById('phoneNextBtn');
        
        if (phoneInput && phoneNextBtn) {
            phoneInput.addEventListener('input', function() {
                const digits = this.value.replace(/\D/g, '');
                const isValid = digits.length >= 10;
                phoneNextBtn.disabled = !isValid;
                phoneNextBtn.classList.toggle('btn-disabled', !isValid);
            });
        }
        
        // Income input (Step 5)
        const incomeInput = document.getElementById('userIncome');
        const incomeNextBtn = document.getElementById('incomeNextBtn');
        
        if (incomeInput && incomeNextBtn) {
            incomeInput.addEventListener('input', function() {
                const value = this.value.replace(/\D/g, '');
                const isValid = parseInt(value) > 0;
                incomeNextBtn.disabled = !isValid;
                incomeNextBtn.classList.toggle('btn-disabled', !isValid);
            });
        }
    }
    
    // PEP Buttons
    function setupPEPButtons() {
        const pepBtns = document.querySelectorAll('.pep-btn');
        pepBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                pepBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // Phone Mask
    function setupPhoneMask() {
        const phoneInput = document.getElementById('userPhone');
        if (!phoneInput) return;
        
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length > 0) {
                if (value.length <= 2) {
                    value = `(${value}`;
                } else if (value.length <= 7) {
                    value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                } else {
                    value = `(${value.slice(0, 2)}) ${value.slice(2, 7)} ${value.slice(7)}`;
                }
            }
            
            e.target.value = value;
        });
    }
    
    // Currency Mask
    function setupCurrencyMask() {
        const currencyInputs = document.querySelectorAll('.input-currency, #userIncomeConfirm');
        
        currencyInputs.forEach(input => {
            input.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value) {
                    value = parseInt(value, 10);
                    value = (value / 100).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    });
                }
                e.target.value = value;
            });
        });
    }
    
    // CPF Mask
    function setupCPFMask() {
        const cpfInput = document.getElementById('userCPF');
        if (!cpfInput) return;
        
        cpfInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length > 9) {
                value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9)}`;
            } else if (value.length > 6) {
                value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
            } else if (value.length > 3) {
                value = `${value.slice(0, 3)}.${value.slice(3)}`;
            }
            
            e.target.value = value;
        });
    }
    
    // Date Mask
    function setupDateMask() {
        const dateInput = document.getElementById('userBirthdate');
        if (!dateInput) return;
        
        dateInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 8) value = value.slice(0, 8);
            
            if (value.length > 4) {
                value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
            } else if (value.length > 2) {
                value = `${value.slice(0, 2)}/${value.slice(2)}`;
            }
            
            e.target.value = value;
        });
    }
    
    // CEP Mask
    function setupCEPMask() {
        const cepInput = document.getElementById('userCEP');
        if (!cepInput) return;
        
        cepInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 8) value = value.slice(0, 8);
            
            if (value.length > 5) {
                value = `${value.slice(0, 5)}-${value.slice(5)}`;
            }
            
            e.target.value = value;
        });
    }
    
    // Form Submission
    function setupFormSubmission() {
        const submitBtn = document.getElementById('submitBtn');
        const whatsappBtn = document.getElementById('whatsappBtn');
        const modalUserName = document.getElementById('modalUserName');
        
        if (submitBtn) {
            submitBtn.addEventListener('click', function() {
                if (modalUserName && userName) {
                    modalUserName.textContent = userName.split(' ')[0];
                }
                successModal.classList.add('active');
            });
        }
        
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', function() {
                const fullName = document.getElementById('fullName')?.value || userName;
                const phone = document.getElementById('userPhone')?.value || '';
                const email = document.getElementById('userEmail')?.value || '';
                
                const message = encodeURIComponent(
                    `Olá! Acabei de fazer uma simulação no site da Lumio.\n\n` +
                    `📋 Meus dados:\n` +
                    `Nome: ${fullName}\n` +
                    `Telefone: ${phone}\n` +
                    `Email: ${email}\n\n` +
                    `💰 Simulação:\n` +
                    `Valor do crédito: R$ ${creditAmount.toLocaleString('pt-BR')}\n` +
                    `Plano: R$ ${planAmount.toLocaleString('pt-BR')} em ${selectedTerm}x\n\n` +
                    `Gostaria de mais informações!`
                );
                
                // WhatsApp number - replace with actual number
                const whatsappNumber = '5511999999999';
                
                window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
            });
        }
    }
}

// Add simulator init to DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initSimulator();
});