// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
const targetElement = document.querySelector(targetId);

if (!targetElement) {
    // Se o elemento não for encontrado, ainda assim fecha o menu
    const navList = document.querySelector('.nav-list');
    const menuToggle = document.querySelector('.menu-toggle');
    if (navList.classList.contains('active')) {
        navList.classList.remove('active');
        menuToggle.classList.remove('active');
    }
    return; // e encerra a função
}

// Scroll suave se o destino existir
window.scrollTo({
    top: targetElement.offsetTop - 80,
    behavior: 'smooth'
});

// Fecha o menu após scroll iniciar
const navList = document.querySelector('.nav-list');
const menuToggle = document.querySelector('.menu-toggle');
if (navList.classList.contains('active')) {
    navList.classList.remove('active');
    menuToggle.classList.remove('active');
}

    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

menuToggle.addEventListener('click', function() {
    navList.classList.toggle('active');
    this.classList.toggle('active');
});

// Scroll down button
const scrollDown = document.querySelector('.scroll-down');
if (scrollDown) {
    scrollDown.addEventListener('click', function() {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
}

// Animate elements on scroll
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.animate');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('animated');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Add animation class to elements
document.querySelectorAll('.hero-content h1, .hero-content p, .hero-btns').forEach(el => {
    el.classList.add('animate');
});

document.querySelectorAll('.about-text, .about-images').forEach(el => {
    el.classList.add('animate');
});

document.querySelectorAll('.section-header, .room-card').forEach(el => {
    el.classList.add('animate');
});

document.querySelectorAll('.section-header, .service-card, .gallery-item, .testimonial-card').forEach(el => {
    el.classList.add('animate');
});

// Lightbox para galeria
const galleryItems = document.querySelectorAll('.gallery-item');
let currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    const imgSrc = galleryItems[currentIndex].querySelector('img').src;

    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${imgSrc}" alt="">
            <span class="close-lightbox">&times;</span>
            <span class="prev-lightbox">&#10094;</span>
            <span class="next-lightbox">&#10095;</span>
        </div>
    `;
    document.body.appendChild(lightbox);

    setTimeout(() => lightbox.classList.add('show'), 10);

    lightbox.querySelector('.close-lightbox').addEventListener('click', closeLightbox);
    lightbox.querySelector('.prev-lightbox').addEventListener('click', showPrevImage);
    lightbox.querySelector('.next-lightbox').addEventListener('click', showNextImage);

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });

    let startX = 0;
    lightbox.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    lightbox.addEventListener('touchend', e => {
        let endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) showNextImage();
        if (endX - startX > 50) showPrevImage();
    });
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (!lightbox) return;
    lightbox.classList.remove('show');
    setTimeout(() => lightbox.remove(), 300);
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    updateLightboxImage();
}

function showPrevImage() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const lightboxImg = document.querySelector('.lightbox-content img');
    lightboxImg.src = galleryItems[currentIndex].querySelector('img').src;
}

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
});

// CSS do Lightbox com navegação
const lightboxStyle = document.createElement('style');
lightboxStyle.textContent = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lightbox.show {
        opacity: 1;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        text-align: center;
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 80vh;
        border-radius: 5px;
    }
    
    .close-lightbox {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 2rem;
        cursor: pointer;
    }

    .prev-lightbox, .next-lightbox {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 3rem;
        color: white;
        cursor: pointer;
        user-select: none;
        padding: 0 10px;
        transition: 0.3s;
    }

    .prev-lightbox { left: -50px; }
    .next-lightbox { right: -50px; }

    .prev-lightbox:hover, .next-lightbox:hover {
        color: #f0f0f0;
        transform: translateY(-50%) scale(1.1);
    }

   @media (max-width: 768px) {
    .lightbox-content img {
        max-height: 60vh;
    }

    .prev-lightbox, .next-lightbox {
        font-size: 2.5rem;
        top: 50%;
        transform: translateY(-50%);
        padding: 0 5px;
    }

    .prev-lightbox { left: 15px; }
    .next-lightbox { right: 15px; }
}
`;
document.head.appendChild(lightboxStyle);

// Formulário de Reserva para WhatsApp
const reservationForm = document.getElementById('reservationForm');
if (reservationForm) {
    // Configurar datas mínimas (hoje para check-in, amanhã para check-out)
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('checkin').min = today;

    document.getElementById('checkin').addEventListener('change', function() {
        const checkinDate = new Date(this.value);
        checkinDate.setDate(checkinDate.getDate() + 1);
        const nextDay = checkinDate.toISOString().split('T')[0];
        document.getElementById('checkout').min = nextDay;
    });

    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Coletar dados do formulário
        const name = document.getElementById('name').value.trim();
        const checkin = document.getElementById('checkin').value;
        const checkout = document.getElementById('checkout').value;
        const people = document.getElementById('people').value;
        const suite = document.getElementById('suite').value;
        const payment = document.getElementById('payment').value;

        // Capturar o valor exibido do preço estimado, só se estiver visível
       const estimatedPriceElement = document.getElementById('estimatedPrice');
let estimatedPriceText = "";

if (estimatedPriceElement && estimatedPriceElement.offsetParent !== null) {
    const strongEl = estimatedPriceElement.querySelector('strong');
    if (strongEl) {
        estimatedPriceText = `Valor aproximado da estadia: ${strongEl.innerText}`;
    }
}


        // Formatando datas para exibição no formato pt-BR
        const checkinDate = new Date(checkin).toLocaleDateString('pt-BR');
        const checkoutDate = new Date(checkout).toLocaleDateString('pt-BR');

        // Criar mensagem para WhatsApp
        let whatsappMessage = `Olá, estava vendo o site e gostaria de realizar uma reserva:\n\n`;
        whatsappMessage += `*Nome:* ${name}\n`;
        whatsappMessage += `*Período:* ${checkinDate} a ${checkoutDate}\n`;
        whatsappMessage += `*Quantidade de pessoas:* ${people}\n`;

        if (suite && suite !== "Não especificada" && suite !== "") {
            whatsappMessage += `*Suite desejada:* ${suite}\n`;
        }

        if (estimatedPriceText) {
            whatsappMessage += `*${estimatedPriceText}*\n`;
        }
        whatsappMessage += `*Forma de pagamento:* ${payment}\n`;

        whatsappMessage += `\nPor favor, confirme os valores e a disponibilidade. Obrigado!`;

        // Número de WhatsApp (substitua pelo número real)
        const whatsappNumber = '55013997458473';

        // Codificar mensagem para URL
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // Abrir WhatsApp em nova aba
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');

        // Resetar formulário
        reservationForm.reset();
    });
}



document.addEventListener('DOMContentLoaded', function () {
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const peopleInput = document.getElementById('people');
    const estimatedDiv = document.getElementById('estimatedPrice');
   
    function calcularValor() {
        const checkin = new Date(checkinInput.value);
        const checkout = new Date(checkoutInput.value);
        const pessoas = parseInt(peopleInput.value);

        if (isNaN(checkin.getTime()) || isNaN(checkout.getTime()) || isNaN(pessoas)) {
            estimatedDiv.style.display = 'none';
            return;
        }

        const diffTime = checkout - checkin;
        const dias = diffTime / (1000 * 60 * 60 * 24);

        if (dias <= 0) {
            estimatedDiv.style.display = 'none';
            return;
        }

        let diariaMin = 250;
        let diariaMax = 350;

        if (pessoas > 2) {
            diariaMin += (pessoas - 2) * 100;
            diariaMax += (pessoas - 2) * 100;
        }

        const valorMin = diariaMin * dias;
        const valorMax = diariaMax * dias;

        estimatedDiv.style.display = 'block';
        estimatedDiv.innerHTML = `
            Valor aproximado da estadia: <br>
            <strong>R$ ${valorMin.toLocaleString('pt-BR', {minimumFractionDigits: 2})} 
            até R$ ${valorMax.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</strong> <br>
            <small>(O valor final será confirmado via WhatsApp)</small>
        `;
    }

    checkinInput.addEventListener('change', calcularValor);
    checkoutInput.addEventListener('change', calcularValor);
    peopleInput.addEventListener('change', calcularValor);

    // CÓDIGO CORRIGIDO PARA FECHAR O MENU MOBILE
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', function() {
            const navList = document.querySelector('.nav-list');
            const menuToggle = document.querySelector('.menu-toggle');
            
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }); // Corrigido: fechamento correto com ");"
    }); // Corrigido: fechamento correto com ");"
});

document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('bgVideo');

    if (video) {
        // Garante que o muted seja aplicado antes
        video.muted = true;

        // Tenta iniciar o vídeo assim que possível
        const tryPlay = () => {
            video.play().catch(() => {
                // Fallback: espera por uma interação do usuário
                document.addEventListener('touchstart', () => {
                    video.play();
                }, { once: true });
            });
        };

        // Se o vídeo ainda não estiver pronto, aguarda carregamento
        if (video.readyState >= 2) {
            tryPlay();
        } else {
            video.addEventListener('canplay', tryPlay, { once: true });
        }
    }
});
