const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize, Paciente, Empleado, HistorialMedico, Tratamiento, Intervencion } = require('./database.js');
const rateLimit = require('express-rate-limit');


// apilimiter config
const apiLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutos
    max: 5000, // Limitar cada IP a 100 solicitudes por ventana de tiempo
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
const authRoutes = require('./routes/auth');
const citasRoutes = require('./routes/citas');

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());

//redirigir peticiones que no sean https en producción
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === "production") {
      res.redirect(`https://${req.header('host')}${req.url}`);
  } else {
      next();
  }
});

// Aplicar a todas las solicitudesD
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
app.use('/citas', citasRoutes);

// Ruta básica para comprobar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('Dental Luxe Backend');
});

// Manejo de errores no capturados
app.use((err, req, res, next) => {
    console.error(err.stack); // Loguea el error
    res.status(500).send('algo salió mal!', err);
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
