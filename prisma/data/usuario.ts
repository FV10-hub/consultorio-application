import bcryptjs from 'bcryptjs';
interface SeedUser {
    email: string;
    password: string;
    name: string;
    role: 'admin'|'user'
  }

export const users=  [
    {
      email: 'fernando@google.com',
      name: 'Fernando Vazquez',
      password: bcryptjs.hashSync('123456'),
      role: 'admin'
    },
    {
      email: 'maria@google.com',
      name: 'Maria Paz Fabio',
      password: bcryptjs.hashSync('123456'),
      role: 'user'
    },


  ]