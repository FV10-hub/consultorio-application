export const personas = [
    {
      nombre_completo: "Juan Pérez",
      documento: "888999",
      telefono: "09868827710",
      email: "juan.perez@correo.com",
      password: "clave123",
      esDoctor: false,
      esUsuario: false,
      esPaciente: true
    },/*
    {
      nombre_completo: "María López",
      documento: "987654321",
      email: "maria.lopez@correo.com",
      password: "clave456",
      esDoctor: false,
      esUsuario: true,
      esPaciente: false
    },
    {
      nombre_completo: "Ana García",
      documento: "321654987",
      email: "ana.garcia@correo.com",
      password: "clave789",
      esDoctor: false,
      esUsuario: true,
      esPaciente: true
    },
    {
      nombre_completo: "Pedro Martínez",
      documento: "741852963",
      email: "pedro.martinez@correo.com",
      password: "clave012",
      esDoctor: true,
      esUsuario: false,
      esPaciente: false
    },
    {
      nombre_completo: "Sofía González",
      documento: "529637418",
      email: "sofia.gonzalez@correo.com",
      password: "clave345",
      esDoctor: false,
      esUsuario: true,
      esPaciente: true
    },
    {
      nombre_completo: "Diego Rodríguez",
      documento: "852963741",
      email: "diego.rodriguez@correo.com",
      password: "clave678",
      esDoctor: true,
      esUsuario: false,
      esPaciente: false
    },
    {
      nombre_completo: "Laura Fernández",
      documento: "418529637",
      email: "laura.fernandez@correo.com",
      password: "clave901",
      esDoctor: false,
      esUsuario: true,
      esPaciente: false
    },
    {
      nombre_completo: "Miguel Pérez",
      documento: "637418529",
      email: "miguel.perez@correo.com",
      password: "clave234",
      esDoctor: true,
      esUsuario: false,
      esPaciente: false
    },
    {
      nombre_completo: "Camila López",
      documento: "952963741",
      email: "camila.lopez@correo.com",
      password: "clave567",
      esDoctor: false,
      esUsuario: true,
      esPaciente: true
    },
    {
      nombre_completo: "Alejandro García",
      documento: "296374185",
      email: "alejandro.garcia@correo.com",
      password: "clave890",
      esDoctor: true,
      esUsuario: false,
      esPaciente: false
    },{
      nombre_completo: "Natalia Romero",
      documento: "198765432",
      email: "natalia.romero@ejemplo.com",
      password: "clave102",
      esDoctor: false,
      esUsuario: true,
      esPaciente: true
    },
    {
      nombre_completo: "Oscar Díaz",
      documento: "487654321",
      email: "oscar.diaz@ejemplo.com",
      password: "clave113",
      esDoctor: true,
      esUsuario: false,
      esPaciente: false
    },
    {
      nombre_completo: "Isabel Martínez",
      documento: "845678901",
      email: "isabel.martinez@ejemplo.com",
      password: "clave124",
      esDoctor: false,
      esUsuario: true,
      esPaciente: false
    },
    {
      nombre_completo: "Carmen Ruiz",
      documento: "123987456",
      email: "carmen.ruiz@correo.com",
      password: "clave098",
      esDoctor: false,
      esUsuario: true,
      esPaciente: true
    },
    {
      nombre_completo: "Fernando Alonso",
      documento: "456321789",
      email: "fernando.alonso@correo.com",
      password: "clave765",
      esDoctor: true,
      esUsuario: false,
      esPaciente: false
    },
    {
      nombre_completo: "Daniela Villar",
      documento: "789654123",
      email: "daniela.villar@correo.com",
      password: "clave432",
      esDoctor: false,
      esUsuario: true,
      esPaciente: true
    },
    {
      nombre_completo: "Marcos Rivas",
      documento: "654987321",
      email: "marcos.rivas@correo.com",
      password: "clave159",
      esDoctor: true,
      esUsuario: false,
      esPaciente: false
    },
    {
      nombre_completo: "Lucía Méndez",
      documento: "321789654",
      email: "lucia.mendez@correo.com",
      password: "clave357",
      esDoctor: false,
      esUsuario: true,
      esPaciente: false
    },
    {
      nombre_completo: "Óscar Domínguez",
      documento: "987123456",
      email: "oscar.dominguez@correo.com",
      password: "clave246",
      esDoctor: true,
      esUsuario: false,
      esPaciente: false
    },
    {
      nombre_completo: "Sara Jiménez",
      documento: "852147963",
      email: "sara.jimenez@correo.com",
      password: "clave864",
      esDoctor: false,
      esUsuario: true,
      esPaciente: true
    },
    {
      nombre_completo: "Iván Castillo",
      documento: "753951456",
      email: "ivan.castillo@correo.com",
      password: "clave951",
      esDoctor: true,
      esUsuario: false,
      esPaciente: false
    },
    {
      nombre_completo: "Elena Sánchez",
      documento: "159357486",
      email: "elena.sanchez@correo.com",
      password: "clave753",
      esDoctor: false,
      esUsuario: true,
      esPaciente: true
    },
    {
      nombre_completo: "Roberto Ortega",
      documento: "258369147",
      email: "roberto.ortega@correo.com",
      password: "clave852",
      esDoctor: true,
      esUsuario: false,
      esPaciente: false
    },
    {
      nombre_completo: "Patricia Molina",
      documento: "951753824",
      email: "patricia.molina@correo.com",
      password: "clave159",
      esDoctor: false,
      esUsuario: true,
      esPaciente: false
    },
    {
      nombre_completo: "Jorge Navarro",
      documento: "753824196",
      email: "jorge.navarro@correo.com",
      password: "clave846",
      esDoctor: true,
      esUsuario: false,
      esPaciente: false
    },
    {
      nombre_completo: "Bárbara Rey",
      documento: "824196753",
      email: "barbara.rey@correo.com",
      password: "clave951",
      esDoctor: false,
      esUsuario: true,
      esPaciente: true
    },
    {
      nombre_completo: "Antonio Moreno",
      documento: "196753824",
      email: "antonio.moreno@correo.com",
      password: "clave753",
      esDoctor: true,
      esUsuario: false,
      esPaciente: false
    },
    {
      nombre_completo: "Isabel Torres",
      documento: "642897531",
      email: "isabel.torres@correo.com",
      password: "clave642",
      esDoctor: false,
      esUsuario: true,
      esPaciente: false
    },
    {
      nombre_completo: "Carlos Jiménez",
      documento: "8975312469",
      email: "carlos.jimenez@correo.com",
      password: "clave468",
      esDoctor: true,
      esUsuario: false,
      esPaciente: false
    },
    {
      nombre_completo: "Susana Pineda",
      documento: "531246897",
      email: "susana.pineda@correo.com",
      password: "clave286",
      esDoctor: false,
      esUsuario: true,
      esPaciente: true
    },
    {
      nombre_completo: "Gustavo Adolfo",
      documento: "246897531",
      email: "gustavo.adolfo@correo.com",
      password: "clave975",
      esDoctor: true,
      esUsuario: false,
      esPaciente: false
    },
    {
      nombre_completo: "Lorena Figueroa",
      documento: "897531246",
      email: "lorena.figueroa@correo.com",
      password: "clave314",
      esDoctor: false,
      esUsuario: true,
      esPaciente: true
    },
    {
      nombre_completo: "David Mora",
      documento: "246531897",
      email: "david.mora@correo.com",
      password: "clave627",
      esDoctor: true,
      esUsuario: false,
      esPaciente: false
    }
  */  
  ];
  