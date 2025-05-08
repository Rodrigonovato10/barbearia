document.addEventListener('DOMContentLoaded', function() {
    // Referências aos elementos
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');
    const bookingForm = document.querySelector('#booking form');
    
    // Toggle do menu mobile
    burger.addEventListener('click', function() {
        nav.classList.toggle('active');
        burger.classList.toggle('toggle');
    });
    
    // Fechar o menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            burger.classList.remove('toggle');
        });
    });
    
    // Rolagem suave para as seções ao clicar nos links do menu
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Validação e processamento do formulário de agendamento com envio de SMS
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obter dados do formulário
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const serviceName = document.getElementById('service').options[document.getElementById('service').selectedIndex].text;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            
            // Validação básica
            if (!name || !phone || !service || !date || !time) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Preparar mensagem para SMS
            const message = `Novo agendamento: Nome: ${name}, Telefone: ${phone}, Serviço: ${serviceName}, Data: ${date}, Horário: ${time}`;
            
            // Enviar para API de SMS
            sendSMS('+5509491991490', message)
                .then(response => {
                    if (response.success) {
                        alert(`Agendamento confirmado para ${name}!\n\nServiço: ${serviceName}\nData: ${date}\nHorário: ${time}\n\nUma confirmação foi enviada por SMS.`);
                        bookingForm.reset();
                    } else {
                        alert('Houve um problema ao enviar o SMS. Por favor, tente novamente mais tarde.');
                    }
                })
                .catch(error => {
                    console.error('Erro ao enviar SMS:', error);
                    alert('Não foi possível enviar o SMS. Por favor, tente novamente mais tarde.');
                });
        });
    }
    
    // Função para enviar SMS (usando endpoint do servidor)
    async function sendSMS(phoneNumber, message) {
        try {
            // Substitua pela URL do seu endpoint de servidor que processará o envio de SMS
            const API_URL = '/api/send-sms';
            
            // Enviar a requisição para o servidor
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    to: phoneNumber,
                    message: message
                })
            });
            
            const data = await response.json();
            
            // Verificar se a mensagem foi enviada com sucesso
            if (response.ok) {
                return { success: true, data };
            } else {
                return { success: false, error: data };
            }
        } catch (error) {
            console.error('Erro ao enviar SMS:', error);
            return { success: false, error };
        }
    }
    
    // Definir data mínima como hoje para o campo de data
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    // Efeito de animação ao rolar (para elementos que entram na viewport)
    function checkVisibility() {
        const serviceCards = document.querySelectorAll('.service-card');
        const windowHeight = window.innerHeight;
        
        serviceCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            
            if (cardTop < windowHeight - 100) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializar os cartões de serviço com opacidade 0
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Verificar visibilidade ao carregar a página e ao rolar
    window.addEventListener('load', checkVisibility);
    window.addEventListener('scroll', checkVisibility);
});