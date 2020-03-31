const express = require('express');
const bodyParser = require('body-parser');
const sendSms = require('./twilio');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const port = 3000;

const userDatabase = [];

// Create users endpoint
app.post('/users', (req, res) => {
  const { email, password, phone } = req.body;
  const user = {
    email,
    password,
    phone
  };

  userDatabase.push(user);

  const welcomeMessage = 'Welcome to Opalod! Your verification code is 54875';

  sendSms(user.phone, welcomeMessage);

  res.status(201).send({
    message: 'Account created successfully, kindly check your phone to activate your account!',
    data: user
  })
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
