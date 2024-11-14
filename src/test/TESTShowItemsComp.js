import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const URI = 'http://localhost:3030/items/';

const TESTShowItemsComp = () => {
    // State para almacenar los items
    const [items, setItems] = useState([]);
    // State para controlar el filtro de estado
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        getItems();
    }, []);

    // Obtener todos los items de la API
    const getItems = async () => {
        const response = await axios.get(URI);
        setItems(response.data);
    };

    // Cambiar el estado de la columna dispocision
    const toggleDisposition = async (id, currentDisposition) => {
        const newDisposition = currentDisposition === 1 ? 0 : 1;
        await axios.put(`${URI}${id}`, { newDisposition });
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, DISPOSICION: newDisposition } : item
            )
        );
    };

    // Filtrar items según el estado seleccionado
    const filteredItems = items.filter((item) => {
        if (filter === 'all') return true; // Mostrar todos los elementos
        if (filter === 'registered') return item.ESTADO === 1; // Solo "Registrado"
        if (filter === 'not_registered') return item.ESTADO === 0; // Solo "No Registrado"
        if (filter === 'available') return item.DISPOSICION === 1; // Solo "Registrado"
        if (filter === 'not_available') return item.DISPOSICION === 0; // Solo "No Registrado"
        return true;
    });

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Link to="/" className="btn btn-warning fw-bolder m-2">INICIO</Link>
                    {/* <Link to="/create" className="btn btn-danger mt-2 mb-2 fw-bolder">AGREGAR ITEM<i className="fas fa-plus"></i></Link> */}

                    {/* Controles para seleccionar el filtro */}
                    <div className="row">
                        <div className="mb-3 col-5 text-start">
                            <label htmlFor="filter1" className="form-label"><h5>Filtrar Por Estado</h5></label>
                            <select id="filter1" className="form-select fw-bolder" value={filter} onChange={(e) => setFilter(e.target.value)}>
                                <option value="all">Todos</option>
                                <option value="registered">Registrado</option>
                                <option value="not_registered">No Registrado</option>
                            </select>
                        </div>
                        <div className="mb-3 col-5 text-start">
                            <label htmlFor="filter2" className="form-label"><h5>Filtrar Por Disposición</h5></label>
                            <select id="filter2" className="form-select fw-bolder" value={filter} onChange={(e) => setFilter(e.target.value)}>
                                <option value="all">Todos</option>
                                <option value="available">Disponibles</option>
                                <option value="not_available">No Disponibles</option>
                            </select>
                        </div>
                    </div>

                    {/* TABLA DE DATOS */}
                    <table className="w-auto table table-striped table-bordered align-middle">
                        <thead className="table-primary">
                            <tr>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>N</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Codigo Patrimonial</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Descripcion</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Dependencia</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Trabajador</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Ultimo Fecha Registro</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Fecha de Alta</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Estado</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Disposición</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.N}</td>
                                    <td>{item.CODIGO_PATRIMONIAL}</td>
                                    <td>{item.DESCRIPCION}</td>
                                    <td>{item.DEPENDENCIA}</td>
                                    <td>{item.TRABAJADOR}</td>
                                    {/* <td>{item.FECHA_REGISTRO}</td> */}
                                    <td>{item.FECHA_REGISTRO ? new Date(item.FECHA_REGISTRO).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }) : ''}</td>
                                    <td>{item.FECHA_ALTA}</td>
                                    <td>
                                        {item.ESTADO === 0 ? (
                                            <span style={{ color: 'red', fontWeight: 'bold' }}>❌ No Registrado</span>
                                        ) : (
                                            <span style={{ color: 'green', fontWeight: 'bold' }}>✅ Registrado</span>
                                        )}
                                    </td>
                                    <td>
                                        {item.DISPOSICION === 0 ? (
                                            <span style={{ color: 'black', fontWeight: 'bold' }}>No</span>
                                        ) : (
                                            <span style={{ color: 'black', fontWeight: 'bold' }}>Si</span>
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() => toggleDisposition(item.CODIGO_PATRIMONIAL, item.DISPOSICION)}
                                        >
                                            {item.DISPOSICION === 0 ? 'Activar' : 'Desactivar'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TESTShowItemsComp;
