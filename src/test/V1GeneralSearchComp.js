import React, { useState, useEffect } from 'react';
import axios from 'axios';

const V1GeneralSearchComp = () => {
    const [searchTerm, setSearchTerm] = useState(''); // Guarda el valor ingresado en el input
    const [results, setResults] = useState([]); // Guarda los datos de los items encontrados


    // Función que maneja el cambio en el input
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value); // Actualiza el estado con el valor del input
    };

    // useEffect para hacer la búsqueda cuando cambia el valor del input
    useEffect(() => {
        const fetchItems = async () => {
            if (searchTerm !== '') {  // Si hay algún valor en el input
                try {
                    const response = await axios.get(`http://localhost:3030/items/search?q=${searchTerm}`);
                    setResults(response.data); // Actualiza el estado con los datos de los items
                } catch (error) {
                    console.log('Error al obtener los items:', error);
                    setResults([]); // Reinicia el estado si hay un error
                }
            } else {
                setResults([]); // Si el input está vacío, limpia la vista
            }
        };

        fetchItems();
    }, [searchTerm]); // Se ejecuta cada vez que searchTerm cambia

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Búsqueda General</h2>
            <input
                type="text"
                placeholder="Ingrese término de búsqueda"
                value={searchTerm}
                onChange={handleInputChange}
                className="form-control mb-4"
            />

            {results.length > 0 ? (
                <div>
                    <h3 className="text-uppercase fw-bolder">Resultados</h3>
                    <table className="w-auto table table-striped table-bordered" style={{ width: '100%', tableLayout: 'fixed' }}>
                        <thead className="thead-dark">
                            <tr>
                            <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>CODIGO PATRIMONIAL</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>DESCRIPCION</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>DEPENDENCIA</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>TRABAJADOR</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.CODIGO_PATRIMONIAL}</td>
                                    <td>{item.DESCRIPCION}</td>
                                    <td>{item.DEPENDENCIA}</td>
                                    <td>{item.TRABAJADOR}</td>
                                    <td>
                                        {item.ESTADO === 0 ? (
                                            <span style={{ color: 'red', fontWeight: 'bold' }}>❌ No Registrado</span>
                                        ) : (
                                            <span style={{ color: 'green', fontWeight: 'bold' }}>✅ Registrado</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                searchTerm && <p className="text-center text-muted">No se encontraron items con el término ingresado.</p>
            )}
        </div>
    );
};

export default V1GeneralSearchComp;