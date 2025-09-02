const router = require('express').Router();
const users = require('../data');

router.post('/api/1.0/auth', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email);
  if(!user) {
    return res.status(401).send({message: 'Invalid credentials'});
  }
  if(user.password !== password) {
    return res.status(401).send({message: 'Invalid credentials'});
  }
  const { id, username } = user;
  res.cookie("app-cookie", `Bearer ${user.username}`, {
    secure: false,
    httpOnly: true
  });
  return res.send({id, username, email: user.email})
})

router.post('/api/1.0/logout', (req, res) => {
  res.clearCookie("app-cookie");
  return res.send({message: 'Logged out'});
})

module.exports = router;