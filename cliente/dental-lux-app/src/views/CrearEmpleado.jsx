import React, { useState, useContext, useEffect } from 'react';
import Layout from '../layout/Layout';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';
import validator from 'validator';

const CrearEmpleado = () => {
  const { user } = useContext(AuthContext);
  const [datos, setDatos] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    dni: "",
    password: "",
    id_categoria_profesional: "",
  });
  const [categorias, setCategorias] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const { data } = await api.get('/categorias');
        setCategorias(data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };
    fetchCategorias();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };

  const validateFields = () => {
    const errors = {};
    if (!validator.isLength(datos.dni, { min: 9, max: 9 })) errors.dni = 'DNI debe tener 9 caracteres';
    if (validator.isEmpty(datos.nombre)) errors.nombre = 'El nombre es requerido';
    if (validator.isEmpty(datos.apellidos)) errors.apellidos = 'Los apellidos son requeridos';
    if (!validator.isEmail(datos.email)) errors.email = 'Correo electrónico inválido';
    if (validator.isEmpty(datos.telefono)) errors.telefono = 'El teléfono es requerido';
    if (!validator.isLength(datos.password, { min: 8 })) errors.password = 'La contraseña debe tener al menos 8 caracteres';
    if (validator.isEmpty(datos.id_categoria_profesional)) errors.id_categoria_profesional = 'La categoría profesional es requerida';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await api.post('/empleados', datos);
      setAlert({ show: true, message: 'Empleado creado con éxito', type: 'success' });
      setDatos({
        nombre: "",
        apellidos: "",
        email: "",
        telefono: "",
        dni: "",
        password: "",
        id_categoria_profesional: "",
      });
      setErrors({});
      setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
    } catch (error) {
      setAlert({ show: true, message: 'Error al crear el empleado', type: 'danger' });
      setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <fieldset className="card p-4">
              <legend className="card-title text-center">Crear Empleado</legend>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="dni" className="form-label">DNI:</label>
                  <input
                    type="text"
                    name="dni"
                    id="dni"
                    className={`form-control ${errors.dni ? 'is-invalid' : ''}`}
                    value={datos.dni}
                    onChange={handleChange}
                  />
                  {errors.dni && <div className="invalid-feedback">{errors.dni}</div>}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre:</label>
                  <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                    value={datos.nombre}
                    onChange={handleChange}
                  />
                  {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="apellidos" className="form-label">Apellidos:</label>
                  <input
                    type="text"
                    name="apellidos"
                    id="apellidos"
                    className={`form-control ${errors.apellidos ? 'is-invalid' : ''}`}
                    value={datos.apellidos}
                    onChange={handleChange}
                  />
                  {errors.apellidos && <div className="invalid-feedback">{errors.apellidos}</div>}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    value={datos.email}
                    onChange={handleChange}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="telefono" className="form-label">Teléfono:</label>
                  <input
                    type="text"
                    name="telefono"
                    id="telefono"
                    className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                    value={datos.telefono}
                    onChange={handleChange}
                  />
                  {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password" className="form-label">Contraseña:</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    value={datos.password}
                    onChange={handleChange}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="id_categoria_profesional" className="form-label">Categoría Profesional:</label>
                  <select
                    name="id_categoria_profesional"
                    id="id_categoria_profesional"
                    className={`form-control ${errors.id_categoria_profesional ? 'is-invalid' : ''}`}
                    value={datos.id_categoria_profesional}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione una categoría</option>
                    {categorias.map((categoria) => (
                      <option key={categoria.id_categoria_profesional} value={categoria.id_categoria_profesional}>
                        {categoria.nombre_categoria}
                      </option>
                    ))}
                  </select>
                  {errors.id_categoria_profesional && <div className="invalid-feedback">{errors.id_categoria_profesional}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Crear Empleado</button>
                {alert.show && (
                  <div className={`alert alert-${alert.type} mt-3`} role="alert">
                    {alert.message}
                  </div>
                )}
              </form>
            </fieldset>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CrearEmpleado;
