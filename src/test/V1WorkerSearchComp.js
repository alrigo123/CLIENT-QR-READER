import React, { useState, useEffect } from 'react';
import axios from 'axios';

const V1WorkerSearchComp = () => {
    const [searchTerm1, setSearchTerm1] = useState(''); // Valor del primer buscador
    const [searchTerm2, setSearchTerm2] = useState(''); // Valor del segundo buscador
    const [results1, setResults1] = useState([]); // Resultados de la primera búsqueda
    const [results2, setResults2] = useState([]); // Resultados de la segunda búsqueda

    // Maneja el cambio en el primer input
    const handleInputChange1 = (e) => {
        setSearchTerm1(e.target.value);
    };

    // Maneja el cambio en el segundo input
    const handleInputChange2 = (e) => {
        setSearchTerm2(e.target.value);
    };

    // useEffect para la primera búsqueda
    useEffect(() => {
        const fetchItems1 = async () => {
            if (searchTerm1 !== '') {
                try {
                    const response = await axios.get(`http://localhost:3030/items/worker?q=${searchTerm1}`);
                    setResults1(response.data);
                } catch (error) {
                    console.log('Error al obtener los items:', error);
                    setResults1([]);
                }
            } else {
                setResults1([]);
            }
        };
        fetchItems1();
    }, [searchTerm1]);

    // useEffect para la segunda búsqueda
    useEffect(() => {
        const fetchItems2 = async () => {
            if (searchTerm2 !== '') {
                try {
                    const response = await axios.get(`http://localhost:3030/items/worker/qty?q=${searchTerm2}`);
                    setResults2(response.data);
                } catch (error) {
                    console.log('Error al obtener los items:', error);
                    setResults2([]);
                }
            } else {
                setResults2([]);
            }
        };
        fetchItems2();
    }, [searchTerm2]);

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Buscar por trabajador</h2>

            {/* Primer buscador */}
            <p className='text-lg-start fw-bold'>ITEMS CON CODIGO PATRIMONIAL DEL TRABAJADOR</p>
            <input
                type="text"
                placeholder="Ingrese datos de trabajador (Apellidos y/o Nombres)"
                value={searchTerm1}
                onChange={handleInputChange1}
                className="form-control mb-4"
            />
            {results1.length > 0 ? (
                <div>
                    <h3 className='fw-semibold'>ITEMS EN PODER DE <strong>{searchTerm1}</strong> </h3>
                    <table className="w-auto table table-striped table-bordered align-middle" style={{ width: '100%', tableLayout: 'fixed' }}>
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
                            {results1.map((item, index) => (
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
                searchTerm1 && <p className="text-center text-danger ">No se encontraron items con los datos del trabajador.</p>
            )}

            <p className='text-lg-start fw-bold'>CANTIDAD ITEMS DEL TRABAJADOR</p>
            {/* Segundo buscador */}
            <input
                type="text"
                placeholder="Ingrese datos de trabajador (Apellidos y/o Nombres)"
                value={searchTerm2}
                onChange={handleInputChange2}
                className="form-control mb-4"
            />
            {results2.length > 0 ? (
                <div>
                    <h3 className='fw-semibold'>CANTIDAD DE ITEMS EN PODER DE <strong>{searchTerm2}</strong> </h3>
                    <table className="w-auto table table-striped table-bordered align-middle" style={{ width: '100%', tableLayout: 'fixed' }}>
                        <thead className="thead-dark">
                            <tr>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>DESCRIPCION</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>DEPENDENCIA</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>TRABAJADOR</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>CANTIDAD ITEMS</th>
                                {/* <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Estado</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {results2.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.DESCRIPCION}</td>
                                    <td>{item.DEPENDENCIA}</td>
                                    <td>{item.TRABAJADOR}</td>
                                    <td>{item.CANTIDAD_ITEMS}</td>
                                    {/* <td>
                                        {item.ESTADO === 0 ? (
                                            <span style={{ color: 'red', fontWeight: 'bold' }}>❌ No Registrado</span>
                                        ) : (
                                            <span style={{ color: 'green', fontWeight: 'bold' }}>✅ Registrado</span>
                                        )}
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                searchTerm2 && <p className="text-center text-danger ">No se encontraron items con los datos del trabajador.</p>
            )}
        </div>
    );
};

export default V1WorkerSearchComp;
