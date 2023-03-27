import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'ict@raliku.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Weslianne Joseph',
    email: 'wnapitalai@raliku.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Alois Napitalai',
    email: 'anapitalai@raliku.com',
    password: bcrypt.hashSync('123456', 10),
  },
]
export default users
