// Variáveis globais

// Detectar quando o DOM está carregado
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar animações e efeitos
    initScrollAnimations();
    initMobileMenu();
    initHeaderScroll();
    initSkillsAnimation();
    initCounters();

    // Efeito de digitação para o hero
    if (document.querySelector('.hero-title span')) {
        initTypingEffect();
    }
});

// Animações de scroll
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Menu mobile
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link
        const navItems = document.querySelectorAll('.nav-links li a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// Header scroll
function initHeaderScroll() {
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Animação das habilidades
function initSkillsAnimation() {
    const skillElements = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const percentage = progressBar.getAttribute('data-percentage');
                progressBar.style.width = `${percentage}%`;
            }
        });
    }, {
        threshold: 0.5
    });

    skillElements.forEach(element => {
        observer.observe(element);
    });
}

// Contadores animados (removido, já que não é utilizado no novo HTML)
function initCounters() { }

// Efeito de digitação
function initTypingEffect() {
    const element = document.querySelector('.hero-title span');
    const text = element.getAttribute('data-text');
    element.textContent = '';

    let i = 0;
    const typingSpeed = 100;

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, typingSpeed);
        } else {
            // Adicionar cursor piscante após a digitação
            element.classList.add('typing-done');
        }
    }

    setTimeout(() => {
        type();
    }, 1000);
}

// Formulário de contato
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Aqui você adicionaria a lógica para enviar o formulário
        // Por enquanto, apenas simulamos o envio
        const submitBtn = contactForm.querySelector('.form-submit');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert('Mensagem enviada com sucesso!');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}


// Função para inicializar a visualização de imagens (lightbox)
function initImageLightbox() {
    // Obter o modal
    const modal = document.getElementById("imageModal");
    // Obter a imagem dentro do modal
    const modalImg = document.getElementById("modalImage");
    // Obter o botão de fechar
    const closeBtn = document.querySelector(".close-button");

    // Adicionar evento de clique em todas as imagens com a classe 'curriculo-preview'
    document.querySelectorAll(".curriculo-preview").forEach(img => {
        img.parentNode.addEventListener('click', function () {
            modal.style.display = "block";
            modalImg.src = img.getAttribute('data-full-src') || img.src; // Usa data-full-src se existir
        });
    });

    // Quando o usuário clica no "x", fechar o modal
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = "none";
        });
    }

    // Quando o usuário clica fora do modal, fechar o modal
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Fechar com a tecla ESC
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// Chamar a função de inicialização do lightbox quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // ... (outras inicializações que você já tem)
    initScrollAnimations();
    initMobileMenu();
    initHeaderScroll();
    initSkillsAnimation();
    initCounters(); // Ainda que esteja vazio, mantém a chamada
    if (document.querySelector('.hero-title span')) {
        initTypingEffect();
    }

    // Adicionar a chamada para a nova função
    initImageLightbox();
});