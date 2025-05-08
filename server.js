// server.js (Node.js + Express + Nodemailer)
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do transporte de e-mail
const transporter = nodemailer.createTransport({
    host: 'seu-servidor-smtp.com', // Ex: smtp.gmail.com, smtp.hostgator.com
    port: 587, // Porta comum para SMTP
    secure: false, // true para 465, false para outras portas
    auth: {
        user: 'seu-email@dominio.com', // Seu e-mail
        pass: 'sua-senha' // Sua senha (use variáveis de ambiente)
    }
});

// Endpoint para enviar e-mail de confirmação
app.post('/api/send-confirmation', async (req, res) => {
    try {
        const { name, email, phone, service, date, time } = req.body;
        
        // Formatar a data para exibição
        const formattedDate = new Date(date).toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // E-mail para o cliente
        const clientMailOptions = {
            from: '"Seu Negócio" <seu-email@dominio.com>',
            to: email,
            subject: `Confirmação de Agendamento - ${service}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
                    <h2 style="color: #333; text-align: center;">Confirmação de Agendamento</h2>
                    <p>Olá <strong>${name}</strong>,</p>
                    <p>Seu agendamento foi confirmado com sucesso!</p>
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin: 20px 0;">
                        <p><strong>Serviço:</strong> ${service}</p>
                        <p><strong>Data:</strong> ${formattedDate}</p>
                        <p><strong>Horário:</strong> ${time}</p>
                    </div>
                    <p>Caso precise reagendar ou cancelar, entre em contato conosco pelo telefone (xx) xxxx-xxxx ou responda a este e-mail.</p>
                    <p>Aguardamos você!</p>
                    <p style="margin-top: 30px; font-size: 12px; color: #777; text-align: center;">
                        Este é um e-mail automático, por favor não responda diretamente.
                    </p>
                </div>
            `
        };
        
        // E-mail para a empresa
        const businessMailOptions = {
            from: '"Sistema de Agendamentos" <seu-email@dominio.com>',
            to: 'luisrodrigo.furta123@gmail.com', // E-mail interno da empresa
            subject: `Novo Agendamento - ${service}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
                    <h2 style="color: #333; text-align: center;">Novo Agendamento Recebido</h2>
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin: 20px 0;">
                        <p><strong>Cliente:</strong> ${name}</p>
                        <p><strong>E-mail:</strong> ${email}</p>
                        <p><strong>Telefone:</strong> ${phone}</p>
                        <p><strong>Serviço:</strong> ${service}</p>
                        <p><strong>Data:</strong> ${formattedDate}</p>
                        <p><strong>Horário:</strong> ${time}</p>
                    </div>
                    <p>Lembre-se de confirmar este agendamento com o cliente.</p>
                </div>
            `
        };
        
        // Enviar e-mail para o cliente
        await transporter.sendMail(clientMailOptions);
        
        // Enviar e-mail para a empresa
        await transporter.sendMail(businessMailOptions);
        
        // Armazenar agendamento no banco de dados (opcional)
        // saveBookingToDatabase(req.body);
        
        res.status(200).json({ success: true, message: 'Agendamento confirmado com sucesso!' });
    } catch (error) {
        console.error('Erro ao enviar confirmação:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// Função opcional para salvar em banco de dados
/* 
function saveBookingToDatabase(bookingData) {
    // Implementar conexão com banco de dados e salvamento
    // Ex: usando MongoDB, MySQL, etc.
}
*/