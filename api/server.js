const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

//import Router path(s)

const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/users-router');

//server
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());


//endpoint(s)
server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send('It works');
});

module.exports = server;