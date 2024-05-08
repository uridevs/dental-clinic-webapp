const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, Paciente, Empleado, HistorialMedico, Tratamiento, Intervencion } = require('./database.js');  // Asegúrate de que el path al archivo de configuración de la DB sea correcto
const rateLimit = require('express-rate-limit');


// apilimiter config
const apiLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutos
    max: 50, // Limitar cada IP a 100 solicitudes por ventana de tiempo
    message: 'Excedido el número máximo de solicitudes. Intente de nuevo más tarde.'
});

// Importar rutas
const pacientesRoutes = require('./routes/pacientes');
const empleadosRoutes = require('./routes/empleados');
const categoriasRoutes = require('./routes/categorias');
const especialidadesRoutes = require('./routes/especialidades');
const historialesMedicosRoutes = require('./routes/historialesMedicos');
const intervencionesRoutes = require('./routes/intervenciones');
const tratamientosRoutes = require('./routes/tratamientos');
const usuariosRoutes = require('./routes/usuarios');
const authRoutes = require('./routes/auth'); // Ajusta la ruta según la ubicación

const app = express();
const port = process.env.PORT || 3000;

// Aplicar a todas las solicitudes
app.use(apiLimiter);
// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.json());

// Configurar rutas
app.use('/login', authRoutes);
app.use('/pacientes', pacientesRoutes);
app.use('/empleados', empleadosRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/especialidades', especialidadesRoutes);
app.use('/historialesMedicos', historialesMedicosRoutes);
app.use('/intervenciones', intervencionesRoutes);
app.use('/tratamientos', tratamientosRoutes);
app.use('/usuarios', usuariosRoutes);

// Ruta básica para comprobar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('Dental Luxe Backend');
});

// Manejo de errores no capturados
app.use((err, req, res, next) => {
    console.error(err.stack); // Loguea el error
    res.status(500).send('¡Algo salió mal!');
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
