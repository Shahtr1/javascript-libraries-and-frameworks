const users = [];
for(let i = 1;i<=25;i++){
  const username = `user${i}`
  users.push({
    id: i,
    username,
    email: `user${i}@mail.com`,
    password: 'P4ssword',
  })
}

module.exports = users;