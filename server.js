const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/enviar-email', async (req, res) => {
  const { nome, email, mensagem } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'eloipsif@gmail.com',
      pass: 'tbjr ilax yyui qdwl'       // senha de app gerada no Google
    }
  });

  const mailOptions = {
    from: 'eloipsif@gmail.com',         
    to: 'eloipsif@gmail.com',          
    replyTo: email,                     // para responder diretamente ao cliente
    subject: `Mensagem de ${nome} via EPSIF Store`,
    text: `Você recebeu uma nova mensagem:\n\nNome: ${nome}\nEmail: ${email}\n\nMensagem:\n${mensagem}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email enviado com sucesso!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao enviar e-mail.');
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
