import { useEffect, useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Layout from "../layout/Layout";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { formatInTimeZone } from "date-fns-tz";
import { parseISO } from "date-fns";
import { useTable, useSortBy, useFilters, usePagination } from 'react-table';

const Citas = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [citas, setCitas] = useState({ futuras: [], pasadas: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCita, setSelectedCita] = useState(null);

  useEffect(() => {
    const fetchCitas = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await api.get("/citas", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const now = new Date();

        let citasFiltradas = data;
        if (user.role === "paciente") {
          citasFiltradas = data.filter(
            (cita) => cita.id_paciente === user.idEspecifico
          );
          const pasadas = citasFiltradas.filter(
            (cita) => new Date(cita.inicio) <= now
          );
          setCitas({ futuras: [], pasadas });
        } else {
          const futuras = citasFiltradas.filter(
            (cita) => new Date(cita.inicio) > now
          );
          const pasadas = citasFiltradas.filter(
            (cita) => new Date(cita.inicio) <= now
          );
          setCitas({ futuras, pasadas });
        }
        setLoading(false);
      } catch (error) {
        setError("Error al cargar las citas");
        setLoading(false);
      }
    };
    fetchCitas();
  }, [user]);

  const handleEliminarClick = (citaId) => {
    setSelectedCita(citaId);
    const deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));
    deleteModal.show();
  };

  const handleConfirmEliminar = async () => {
    try {
      await api.delete(`/citas/${selectedCita}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCitas({
        futuras: citas.futuras.filter((cita) => cita.id !== selectedCita),
        pasadas: citas.pasadas.filter((cita) => cita.id !== selectedCita),
      });
      toast.success("Cita eliminada correctamente.", { position: "top-center", autoClose: 3000 });
    } catch (error) {
      toast.error("Error al eliminar la cita.", { position: "bottom-center", autoClose: 3000 });
    }
  };

  const handleEstadoChange = (cita, newEstado) => {
    if (newEstado !== cita.estado) {
      setSelectedCita({ ...cita, estado: newEstado });
    } else {
      setSelectedCita(null);
    }
  };

  const handleGuardarEstado = async (cita) => {
    if (!selectedCita || selectedCita.estado === cita.estado) {
      toast.warn("Por favor, selecciona un nuevo estado antes de guardar.", { position: "bottom-center", autoClose: 3000 });
      return;
    }
    try {
      await api.put(`/citas/${cita.id}`, { estado: selectedCita.estado }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCitas((prev) => {
        const key = new Date(cita.inicio) > new Date() ? "futuras" : "pasadas";
        return {
          ...prev,
          [key]: prev[key].map((c) => (c.id === cita.id ? { ...c, estado: selectedCita.estado } : c)),
        };
      });
      toast.success("Estado de la cita actualizado correctamente.", { position: "top-center", autoClose: 3000 });
      setSelectedCita(null);
    } catch (error) {
      toast.error("Error al guardar el estado de la cita.", { position: "bottom-center", autoClose: 3000 });
    }
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

  const handleCrearCita = () => {
    navigate("/Crearcita");
  };

  const handleEditarCita = (id) => {
    navigate(`/editarcita/${id}`);
  };

  const columns = useMemo(
    () => [
      { Header: "Cita", accessor: "id" },
      {
        Header: "Paciente",
        accessor: (row) => `${row.paciente?.nombre} ${row.paciente?.apellidos}`,
        id: "paciente",
      },
      {
        Header: "Doctor",
        accessor: (row) => `${row.doctor?.nombre} ${row.doctor?.apellidos}`,
        id: "doctor",
      },
      { Header: "Tratamiento", accessor: "tratamiento.nombre_tratamiento" },
      {
        Header: "Inicio",
        accessor: (row) => formatInTimeZone(parseISO(row.inicio), 'UTC', "dd/MM/yyyy HH:mm"),
        id: "inicio",
      },
      {
        Header: "Fin",
        accessor: (row) => formatInTimeZone(parseISO(row.fin), 'UTC', "dd/MM/yyyy HH:mm"),
        id: "fin",
        disableFilters: true,
      },
      {
        Header: "Estado",
        accessor: "estado",
        disableFilters: true,
        Cell: ({ row }) => (
          <>
            {user.role === "paciente" ? (
              <span>{row.original.estado}</span>
            ) : (
              <>
                <select
                  className="form-select form-select-sm"
                  value={selectedCita && selectedCita.id === row.original.id ? selectedCita.estado : row.original.estado}
                  onChange={(e) => handleEstadoChange(row.original, e.target.value)}
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Cancelada">Cancelada</option>
                  <option value="En Espera">En Espera</option>
                  <option value="En Proceso">En Proceso</option>
                  <option value="Finalizada">Finalizada</option>
                </select>
                <button className="btn btn-success btn-sm ms-2 mt-1" onClick={() => handleGuardarEstado(row.original)}>
                  <i className="fas fa-save"></i>
                </button>
              </>
            )}
          </>
        ),
      },
      ...(user.role === "paciente" ? [] : [
        {
          Header: "Acciones",
          accessor: "acciones",
          disableFilters: true,
          disableSortBy: true,
          Cell: ({ row }) => (
            <div>
              <button className="btn btn-warning btn-sm me-2" title="Editar Cita" onClick={() => handleEditarCita(row.original.id)}>
                <i className="fas fa-edit"></i>
              </button>
              {user.role === "1" && (
                <button className="btn btn-danger btn-sm" title="Eliminar Cita" onClick={() => handleEliminarClick(row.original.id)}>
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
          ),
        },
      ]),
    ],
    [selectedCita, user.role]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    pageOptions,
    prepareRow,
  } = useTable(
    { columns, data: citas.futuras },
    useFilters,
    useSortBy,
    usePagination
  );

  const {
    getTableProps: getTablePropsPasadas,
    getTableBodyProps: getTableBodyPropsPasadas,
    headerGroups: headerGroupsPasadas,
    page: pagePasadas,
    canPreviousPage: canPreviousPagePasadas,
    canNextPage: canNextPagePasadas,
    gotoPage: gotoPagePasadas,
    nextPage: nextPagePasadas,
    previousPage: previousPagePasadas,
    setPageSize: setPageSizePasadas,
    state: { pageIndex: pageIndexPasadas, pageSize: pageSizePasadas },
    pageOptions: pageOptionsPasadas,
    prepareRow: prepareRowPasadas,
  } = useTable(
    { columns, data: citas.pasadas },
    useFilters,
    useSortBy,
    usePagination
  );

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Layout>
      <div className="container mt-5">
        <div className="text-center">
          <h1 className="mb-4">{user.role === "paciente" ? "Historial de Citas" : "Citas Clínica"}</h1>
          <div className="d-flex justify-content-center gap-2 mb-4">
            <button className="btn btn-secondary" onClick={handleVolver}>Volver</button>
            {user && user.role !== "paciente" && (
              <button className="btn btn-success" onClick={handleCrearCita}>Crear Cita</button>
            )}
          </div>
        </div>

        <div className="table-responsive">
          {user.role !== "paciente" && (
            <>
              <h2 className="text-center mt-5">Citas Futuras</h2>
              <table {...getTableProps()} className="table table-bordered table-striped">
                <thead>
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                          {column.render('Header')}
                          <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map(row => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map(cell => <td {...cell.getCellProps()}>{cell.render('Cell')}</td>)}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="pagination d-flex justify-content-between align-items-center">
                <div className="pagination-controls">
                  <button className="btn btn-primary btn-sm" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {"<<"}
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {"<"}
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={() => nextPage()} disabled={!canNextPage}>
                    {">"}
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={() => gotoPage(pageOptions.length - 1)} disabled={!canNextPage}>
                    {">>"}
                  </button>
                </div>
                <span>
                  Página{" "}
                  <strong>
                    {pageIndex + 1} de {pageOptions.length}
                  </strong>{" "}
                </span>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="form-select form-select-sm"
                  style={{ width: '120px' }}
                >
                  {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                      Mostrar {pageSize}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <h2 className="text-center mt-5">Citas Pasadas</h2>
          <table {...getTablePropsPasadas()} className="table table-bordered table-striped">
            <thead>
              {headerGroupsPasadas.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                      <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyPropsPasadas()}>
              {pagePasadas.map(row => {
                prepareRowPasadas(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => <td {...cell.getCellProps()}>{cell.render('Cell')}</td>)}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="pagination d-flex justify-content-between align-items-center">
            <div className="pagination-controls">
              <button className="btn btn-primary btn-sm" onClick={() => gotoPagePasadas(0)} disabled={!canPreviousPagePasadas}>
                {"<<"}
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => previousPagePasadas()} disabled={!canPreviousPagePasadas}>
                {"<"}
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => nextPagePasadas()} disabled={!canNextPagePasadas}>
                {">"}
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => gotoPagePasadas(pageOptionsPasadas.length - 1)} disabled={!canNextPagePasadas}>
                {">>"}
              </button>
            </div>
            <span>
              Página{" "}
              <strong>
                {pageIndexPasadas + 1} de {pageOptionsPasadas.length}
              </strong>{" "}
            </span>
            <select
              value={pageSizePasadas}
              onChange={(e) => setPageSizePasadas(Number(e.target.value))}
              className="form-select form-select-sm"
              style={{ width: '120px' }}
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Mostrar {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <ToastContainer />

      {/* Modal de Confirmación */}
      <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Confirmar eliminación</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">¿Estás seguro de que quieres eliminar esta cita? Este cambio es irreversible.</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Volver</button>
              <button type="button" className="btn btn-danger" onClick={handleConfirmEliminar} data-bs-dismiss="modal">Confirmar</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Citas;
