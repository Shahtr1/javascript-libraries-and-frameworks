const router = require('express').Router();
const users = require('../data');


router.post('/api/1.0/users', (req, res) => {
  const user = req.body;

  const email = user.email;
  const foundUser = users.find(user => user.email === email);
  if(foundUser) {
    return res.status(400).send({
      validationErrors: {
        email: "Use another email"
      }
    })
  }
  const last = users[users.length-1];
  user.id = last.id + 1;
  users.push(user)
  console.log(`open http://localhost:4200/activate/${user.username}123 to activate your account`)
  return res.send({...user})
})

router.get('/api/1.0/users/:id', (req, res) => {
  const matchingUser = users.find(user => user.id == req.params.id);
  if(matchingUser) {
    const { id, username, email } = matchingUser
    return res.send({ id, username, email });
  }
  res.status(404).send({message: 'User not found'});
})

router.get('/api/1.0/users', (req, res) => {
  let page = Number.parseInt(req.query.page);
  let size = Number.parseInt(req.query.size);
  if (Number.isNaN(page)) {
    page = 0;
  }
  if (Number.isNaN(size)) {
    size = 5;
  }
  let start = page * size;
  let end = (page + 1) * size;

  let userList = users;
  if(req.authenticatedUser){
    userList = users.filter(user => user.id !== req.authenticatedUser.id);
  }

  let totalPages = Math.ceil(userList.length / size);
  const body = {
    content: userList.slice(start, end).map(user => {
      const { id, username, email } = user
      return {
        id, username, email
      } 
    }),
    page,
    size,
    totalPages,
  };
  res.send(body);
})

router.post('/api/1.0/user/email', (req, res) => {
  const email = req.body.email
  if(email === 'user1@mail.com') {
    return res.status(404).send({ message: 'User not found'});  
  }
  const user = users.find(user => user.email === email);
  if(user) {
    return res.send(user);
  }
  return res.status(404).send({ message: 'User not found'});
})

router.post('/api/1.0/users/token/:token', (req, res) => {
  if(req.params.token.endsWith('123')) {
    return res.send({message: 'Account activated'});
  }
  res.status(400).send({message: 'Activation failure'})
})


module.exports = router;