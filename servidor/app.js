const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database'); // Asegúrate de que el path al archivo de configuración de la DB sea correcto

// Importar rutas
const pacientesRoutes = require('./routes/pacientes');
const empleadosRoutes = require('./routes/empleados');
const categoriasRoutes = require('./routes/categorias');
const especialidadesRoutes = require('./routes/especialidades');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.json());

// Configurar rutas
app.use('/pacientes', pacientesRoutes);
app.use('/empleados', empleadosRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/especialidades', especialidadesRoutes);

// Ruta básica para comprobar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente.');
});

// Inicialización y sincronización de la base de datos
sequelize.sync().then(() => {
  console.log('Conexión a la base de datos establecida con éxito.');
}).catch(err => {
  console.error('No se pudo conectar con la base de datos:', err);
});

// Escuchar en el puerto configurado
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

module.exports = app;
