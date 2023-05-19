import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@odfd.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Charlie Ikosi',
    email: 'cikosi@odfd.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Alois Napitalai',
    email: 'anapitalai@odfd.com',
    password: bcrypt.hashSync('123456', 10),
  },
]
export default users
