import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import api from "../api/api";
import { useTable, useSortBy, useFilters, usePagination } from 'react-table';


const AdministradorDashboard = () => {
  const [pacientes, setPacientes] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemType, setItemType] = useState("");
  const [itemToReset, setItemToReset] = useState(null);
  const [resetType, setResetType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pacientesRes, empleadosRes, categoriasRes] = await Promise.all([
          api.get("/pacientes"),
          api.get("/empleados"),
          api.get("/categorias"),
        ]);
        setPacientes(pacientesRes.data);
        setEmpleados(empleadosRes.data);
        setCategorias(categoriasRes.data);
        setLoading(false);
      } catch (error) {
        setError("Error al cargar la información");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      if (itemType === "paciente") {
        await api.delete(`/pacientes/${itemToDelete.id_paciente}`);
        setPacientes(
          pacientes.filter((p) => p.id_paciente !== itemToDelete.id_paciente)
        );
      } else if (itemType === "empleado") {
        await api.delete(`/empleados/${itemToDelete.id_empleado}`);
        setEmpleados(
          empleados.filter((e) => e.id_empleado !== itemToDelete.id_empleado)
        );
      }
      setItemToDelete(null);
      setItemType("");
    } catch (error) {
      setError("Error al eliminar el elemento");
    }
  };

  const handleResetPassword = async () => {
    try {
      await api.put(`/usuarios/reset-password`, {
        id: itemToReset.usuarioId, // Asegurarse de enviar el id correcto
      });
      setItemToReset(null);
      setResetType("");
      alert(`Contraseña restablecida con éxito.`);
    } catch (error) {
      setError("Error al restablecer la contraseña:" + error);
    }
  };

  const getCategoriaNombre = (id_categoria_profesional) => {
    const categoria = categorias.find(
      (cat) => cat.id_categoria_profesional === id_categoria_profesional
    );
    return categoria ? categoria.nombre_categoria : "Desconocida";
  };

  const columnsPacientes = useMemo(
    () => [
      {
        Header: "DNI",
        accessor: "dni",
      },
      {
        Header: "Nombre",
        accessor: (row) => `${row.nombre} ${row.apellidos}`,
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Teléfono",
        accessor: "telefono",
      },
      {
        Header: "Acciones",
        accessor: "acciones",
        disableFilters: true,
        disableSortBy: true,
        Cell: ({ row }) => (
          <div>
            <button
              className="btn btn-danger btn-sm"
              title="Eliminar Paciente"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
              onClick={() => {
                setItemToDelete(row.original);
                setItemType("paciente");
              }}
            >
              <i className="fas fa-times"></i>
            </button>
            <Link
              to={`/administrador/pacientes/${row.original.id_paciente}/editar`}
              className="btn btn-warning btn-sm ms-2"
              title="Editar Paciente"
            >
              <i className="fas fa-edit"></i>
            </Link>
            <button
              className="btn btn-secondary btn-sm ms-2"
              title="Restablecer Contraseña"
              data-bs-toggle="modal"
              data-bs-target="#resetPasswordModal"
              onClick={() => {
                setItemToReset(row.original);
                setResetType("paciente");
              }}
            >
              <i className="fas fa-key"></i>
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const columnsEmpleados = useMemo(
    () => [
      {
        Header: "DNI",
        accessor: "dni",
      },
      {
        Header: "Nombre",
        accessor: (row) => `${row.nombre} ${row.apellidos}`,
      },
      {
        Header: "Categoría",
        accessor: (row) =>
          getCategoriaNombre(row.id_categoria_profesional),
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Teléfono",
        accessor: "telefono",
      },
      {
        Header: "Acciones",
        accessor: "acciones",
        disableFilters: true,
        disableSortBy: true,
        Cell: ({ row }) => (
          <div>
            <button
              className="btn btn-danger btn-sm"
              title="Eliminar Empleado"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
              onClick={() => {
                setItemToDelete(row.original);
                setItemType("empleado");
              }}
            >
              <i className="fas fa-times"></i>
            </button>
            <Link
              to={`/administrador/empleados/${row.original.id_empleado}/editar`}
              className="btn btn-warning btn-sm ms-2"
              title="Editar Empleado"
            >
              <i className="fas fa-edit"></i>
            </Link>
            <button
              className="btn btn-secondary btn-sm ms-2"
              title="Restablecer Contraseña"
              data-bs-toggle="modal"
              data-bs-target="#resetPasswordModal"
              onClick={() => {
                setItemToReset(row.original);
                setResetType("empleado");
              }}
            >
              <i className="fas fa-key"></i>
            </button>
          </div>
        ),
      },
    ],
    [categorias]
  );

  const {
    getTableProps: getTablePropsPacientes,
    getTableBodyProps: getTableBodyPropsPacientes,
    headerGroups: headerGroupsPacientes,
    page: pagePacientes,
    canPreviousPage: canPreviousPagePacientes,
    canNextPage: canNextPagePacientes,
    gotoPage: gotoPagePacientes,
    nextPage: nextPagePacientes,
    previousPage: previousPagePacientes,
    setPageSize: setPageSizePacientes,
    state: { pageIndex: pageIndexPacientes, pageSize: pageSizePacientes },
    pageOptions: pageOptionsPacientes,
    prepareRow: prepareRowPacientes,
  } = useTable(
    {
      columns: columnsPacientes,
      data: pacientes,
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const {
    getTableProps: getTablePropsEmpleados,
    getTableBodyProps: getTableBodyPropsEmpleados,
    headerGroups: headerGroupsEmpleados,
    page: pageEmpleados,
    canPreviousPage: canPreviousPageEmpleados,
    canNextPage: canNextPageEmpleados,
    gotoPage: gotoPageEmpleados,
    nextPage: nextPageEmpleados,
    previousPage: previousPageEmpleados,
    setPageSize: setPageSizeEmpleados,
    state: { pageIndex: pageIndexEmpleados, pageSize: pageSizeEmpleados },
    pageOptions: pageOptionsEmpleados,
    prepareRow: prepareRowEmpleados,
  } = useTable(
    {
      columns: columnsEmpleados,
      data: empleados,
    },
    useFilters,
    useSortBy,
    usePagination
  );

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Layout>
      <div className="container mt-5">
        <div className="row mt-5">
          <div className="col-xl-4 col-md-6 mb-4">
            <div className="card bg-primary text-white h-100">
              <div className="card-body">
                <i className="fas fa-users"></i> Gestión Usuarios
              </div>
              <div className="card-footer">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Link className="small text-white" to="crear-empleado">
                    Registrar empleado
                  </Link>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <Link className="small text-white" to="/crear-paciente">
                    Registrar paciente
                  </Link>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-md-6 mb-4">
            <div className="card bg-secondary text-white h-100">
              <div className="card-body">
                <i className="fas fa-user-tie"></i> Otras gestiones
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link
                  className="small text-white stretched-link"
                  to="#"
                >
                  Ir
                </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-md-6">
            <div className="card bg-success text-white mb-4">
              <div className="card-body">
                <i className="fas fa-calendar-check"></i> Gestión Citas
              </div>
              <div className="card-footer">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Link className="small text-white" to="/citas">
                    Todas las citas
                  </Link>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <Link className="small text-white" to="/crearcita">
                    Crear cita
                  </Link>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-xl-12 mb-4">
            <div className="card">
              <div className="card-header">
                <i className="fas fa-users me-1"></i> Pacientes
              </div>
              <div className="card-body">
                <table {...getTablePropsPacientes()} className="table table-bordered">
                  <thead>
                    {headerGroupsPacientes.map(headerGroup => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                          <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                            {column.render('Header')}
                            <span>
                              {column.isSorted
                                ? column.isSortedDesc
                                  ? ' 🔽'
                                  : ' 🔼'
                                : ''}
                            </span>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyPropsPacientes()}>
                    {pagePacientes.map(row => {
                      prepareRowPacientes(row);
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map(cell => {
                            return (
                              <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="pagination">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => gotoPagePacientes(0)}
                    disabled={!canPreviousPagePacientes}
                  >
                    {"<<"}
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => previousPagePacientes()}
                    disabled={!canPreviousPagePacientes}
                  >
                    {"<"}
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => nextPagePacientes()}
                    disabled={!canNextPagePacientes}
                  >
                    {">"}
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => gotoPagePacientes(pageOptionsPacientes.length - 1)}
                    disabled={!canNextPagePacientes}
                  >
                    {">>"}
                  </button>
                  <span className="mx-2">
                    Página{" "}
                    <strong>
                      {pageIndexPacientes + 1} de {pageOptionsPacientes.length}
                    </strong>{" "}
                  </span>
                  <select
                    value={pageSizePacientes}
                    onChange={(e) => setPageSizePacientes(Number(e.target.value))}
                    className="form-select form-select-sm"
                    style={{ width: "auto", display: "inline-block" }}
                  >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        Mostrar {pageSize}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-12 mb-4">
            <div className="card">
              <div className="card-header">
                <i className="fas fa-user-tie me-1"></i> Empleados
              </div>
              <div className="card-body">
                <table {...getTablePropsEmpleados()} className="table table-bordered">
                  <thead>
                    {headerGroupsEmpleados.map(headerGroup => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                          <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                            {column.render('Header')}
                            <span>
                              {column.isSorted
                                ? column.isSortedDesc
                                  ? ' 🔽'
                                  : ' 🔼'
                                : ''}
                            </span>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyPropsEmpleados()}>
                    {pageEmpleados.map(row => {
                      prepareRowEmpleados(row);
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map(cell => {
                            return (
                              <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="pagination">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => gotoPageEmpleados(0)}
                    disabled={!canPreviousPageEmpleados}
                  >
                    {"<<"}
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => previousPageEmpleados()}
                    disabled={!canPreviousPageEmpleados}
                  >
                    {"<"}
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => nextPageEmpleados()}
                    disabled={!canNextPageEmpleados}
                  >
                    {">"}
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => gotoPageEmpleados(pageOptionsEmpleados.length - 1)}
                    disabled={!canNextPageEmpleados}
                  >
                    {">>"}
                  </button>
                  <span className="mx-2">
                    Página{" "}
                    <strong>
                      {pageIndexEmpleados + 1} de {pageOptionsEmpleados.length}
                    </strong>{" "}
                  </span>
                  <select
                    value={pageSizeEmpleados}
                    onChange={(e) => setPageSizeEmpleados(Number(e.target.value))}
                    className="form-select form-select-sm"
                    style={{ width: "auto", display: "inline-block" }}
                  >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        Mostrar {pageSize}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal de Confirmación */}
        <div
          className="modal fade"
          id="deleteModal"
          tabIndex="-1"
          aria-labelledby="deleteModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel">
                  Confirmar eliminación
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                ¿Estás seguro de que quieres eliminar este {itemType}?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                  data-bs-dismiss="modal"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal de Restablecimiento de Contraseña */}
        <div
          className="modal fade"
          id="resetPasswordModal"
          tabIndex="-1"
          aria-labelledby="resetPasswordModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="resetPasswordModalLabel">
                  Confirmar restablecimiento de contraseña
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                ¿Estás seguro de que quieres restablecer la contraseña de este{" "}
                {resetType} a {resetType === "paciente" ? "Paciente1234." : "Empleado1234."}?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleResetPassword}
                  data-bs-dismiss="modal"
                >
                  Restablecer Contraseña
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdministradorDashboard;
