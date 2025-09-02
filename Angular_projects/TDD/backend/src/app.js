const express = require('express');
const cors = require('cors');
const cookieParse = require('cookie-parser');
const UserRouter = require('./user/UserRouter');
const AuthenticationRouter = require('./auth/AuthenticationRouter');
const users = require('./data');
const app = express();
app.use(express.json())
app.use(cookieParse())

app.use(cors());

app.use((req,res,next) => {
  const cookie = req.cookies['app-cookie'];
  if(cookie) {
    const username = cookie.substring(7)
    const user = users.find(user => user.username === username);
    if(user) {
      req.authenticatedUser = user;
    }
  }
  next();
})
app.use(UserRouter);

app.use(AuthenticationRouter);

module.exports = app;