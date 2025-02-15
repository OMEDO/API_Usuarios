const sql = require('mssql');

const config = {
  user: 'sa',
  password: 'Pru3b@T3cn1c@N0d3',
  server: 'localhost',
  database: 'Usuarios',
  options: {
    encrypt: true, // Para conexiones cifradas (si aplica)
    trustServerCertificate: true // Para evitar problemas de certificado SSL
  }
};

sql.connect(config).then(() => {
  console.log('Conexión exitosa a la base de datos!');
  sql.close();
}).catch(err => {
  console.error('Error de conexión:', err);
});
