const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rota de teste opcional (para saber se a API está online)
app.get('/', (req, res) => {
  res.send('API EPSIF Store rodando.');
});

app.post('/enviar-email', async (req, res) => {
  const { nome, email, mensagem } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, // variáveis de ambiente seguras
      pass: process.env.SENHA
    }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    replyTo: email,
    subject: `Mensagem de ${nome} via EPSIF Store`,
    text: `Você recebeu uma nova mensagem:\n\nNome: ${nome}\nEmail: ${email}\n\nMensagem:\n${mensagem}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).send('Erro ao enviar e-mail.');
  }
});

// Porta obrigatória para ambientes como Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

