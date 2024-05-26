import React, { useState, useContext } from "react";
import Layout from "../layout/Layout";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import validator from "validator";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const CrearPaciente = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [datos, setDatos] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    dni: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };

  const validateFields = () => {
    const errors = {};
    if (!validator.isLength(datos.dni, { min: 9, max: 9 }))
      errors.dni = "DNI debe tener 9 caracteres";
    if (validator.isEmpty(datos.nombre))
      errors.nombre = "El nombre es requerido";
    if (validator.isEmpty(datos.apellidos))
      errors.apellidos = "Los apellidos son requeridos";
    if (!validator.isEmail(datos.email))
      errors.email = "Correo electrónico inválido";
    if (validator.isEmpty(datos.telefono))
      errors.telefono = "El teléfono es requerido";
    if (!validator.isLength(datos.password, { min: 8 }))
      errors.password = "La contraseña debe tener al menos 8 caracteres";
    if (datos.password !== datos.confirmPassword)
      errors.confirmPassword = "Las contraseñas no coinciden";
    return errors;
  };

  const handleVolver = () => {
    if (user.role === "paciente") {
      navigate(`/paciente/${user.idEspecifico}`);
    } else if (user.role === "1") {
      navigate("/Administrador");
    } else {
      navigate(`/empleado/${user.idEspecifico}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await api.post("/pacientes", datos);
      toast.success("Paciente creado con éxito", {
        position: "top-center",
        autoClose: 2600,
      });
      setTimeout(() => {
        handleVolver();
      }, 2600);
    } catch (error) {
      toast.error("Error al crear el paciente", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <div className="d-flex justify-content-center gap-2 mb-4">
          <button className="btn btn-secondary" onClick={handleVolver}>
            Volver
          </button>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <fieldset className="card p-4">
              <legend className="card-title text-center">Crear Paciente</legend>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="dni" className="form-label">
                    DNI:
                  </label>
                  <input
                    type="text"
                    name="dni"
                    id="dni"
                    className={`form-control ${errors.dni ? "is-invalid" : ""}`}
                    value={datos.dni}
                    onChange={handleChange}
                    maxLength="9" // Limitar a 9 caracteres
                  />
                  {errors.dni && (
                    <div className="invalid-feedback">{errors.dni}</div>
                  )}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Nombre:
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    className={`form-control ${
                      errors.nombre ? "is-invalid" : ""
                    }`}
                    value={datos.nombre}
                    onChange={handleChange}
                  />
                  {errors.nombre && (
                    <div className="invalid-feedback">{errors.nombre}</div>
                  )}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="apellidos" className="form-label">
                    Apellidos:
                  </label>
                  <input
                    type="text"
                    name="apellidos"
                    id="apellidos"
                    className={`form-control ${
                      errors.apellidos ? "is-invalid" : ""
                    }`}
                    value={datos.apellidos}
                    onChange={handleChange}
                  />
                  {errors.apellidos && (
                    <div className="invalid-feedback">{errors.apellidos}</div>
                  )}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    value={datos.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="telefono" className="form-label">
                    Teléfono:
                  </label>
                  <input
                    type="text"
                    name="telefono"
                    id="telefono"
                    className={`form-control ${
                      errors.telefono ? "is-invalid" : ""
                    }`}
                    value={datos.telefono}
                    onChange={handleChange}
                  />
                  {errors.telefono && (
                    <div className="invalid-feedback">{errors.telefono}</div>
                  )}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña:
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      value={datos.password}
                      onChange={handleChange}
                    />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirmar Contraseña:
                  </label>
                  <div className="input-group">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      id="confirmPassword"
                      className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                      value={datos.confirmPassword}
                      onChange={handleChange}
                    />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">{errors.confirmPassword}</div>
                  )}
                </div>
                <button type="submit" className="btn btn-primary">
                  Crear Paciente
                </button>
              </form>
            </fieldset>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default CrearPaciente;
