import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const CodePropertyComp = () => {
    const [barcode, setBarcode] = useState(''); // Guarda el valor ingresado en el input
    const [itemData, setItemData] = useState(null); // Guarda los datos del item encontrado
    const inputRef = useRef(null); // Crear una referencia para el input

    // Función que maneja el cambio en el input
    const handleInputChange = (e) => {
        setBarcode(e.target.value); // Actualiza el estado con el valor del input
    };

    const clearInput = () => {
        setBarcode('');
        setItemData(null);
        inputRef.current.focus(); // Coloca el cursor en el input después de limpiarlo
    };

    // useEffect para hacer la búsqueda cada vez que cambia el valor del input
    useEffect(() => {
        const fetchItem = async () => {
            if (barcode !== '') {
                try {
                    // Intentar obtener el item por el ID ingresado
                    const response = await axios.get(`http://localhost:3030/items/${barcode}`);
                    const item = response.data;

                    if (item) {
                        setItemData(item); // Guarda los datos del item para mostrarlo
                    }
                } catch (error) {
                    console.log('Error al obtener el item:', error);
                    setItemData(null); // Limpia la vista si no se encuentra el item
                }
            } else {
                setItemData(null); // Limpia la vista si el input está vacío
            }
        };

        fetchItem();
    }, [barcode]); // Ejecuta la búsqueda cada vez que cambia el valor de barcode

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Buscar por código patrimonial</h2>
            <div className='row g-3'>
                <div className='col-10'>
                    <input
                        type="text"
                        placeholder="Ingrese código patrimonial"
                        value={barcode}
                        onChange={handleInputChange}
                        ref={inputRef} // Asigna la referencia al input
                        className="form-control mb-3"
                        style={{ marginBottom: '20px', fontSize: '1rem', padding: '10px' }}
                    />
                </div>
                <div className='col-2'>
                    <button
                        onClick={clearInput}
                        className="btn btn-dark mb-3 fw-bold"
                        style={{ marginBottom: '20px', fontSize: '1rem', padding: '10px' }}
                    >
                        🧹 Limpiar
                    </button>
                </div>
            </div>

            {itemData ? (
                <div className="d-flex justify-content-center mt-3">
                    <div className="row g-5 align-items-center">
                        <div className="col-auto text-start">
                            <h2 className="text-uppercase fw-medium mb-3">Información del Item</h2>
                            <h4 style={{ color: 'black', marginBottom: '10px' }}>Código Patrimonial: <strong>{itemData.CODIGO_PATRIMONIAL}</strong></h4>
                            <h4 style={{ color: 'black', marginBottom: '10px' }}>Descripción: <strong>{itemData.DESCRIPCION}</strong></h4>
                            <h4 style={{ color: 'black', marginBottom: '10px' }}>Dependencia: <strong>{itemData.DEPENDENCIA}</strong></h4>
                            <h4 style={{ color: 'black', marginBottom: '10px' }}>Trabajador: <strong>{itemData.TRABAJADOR}</strong></h4>
                            {/* <p><strong>Estado :</strong> {itemData.ESTADO}</p> */}
                            <p>
                                {itemData.ESTADO === 0 ? (
                                    <h4 style={{ color: 'black', marginBottom: '10px' }}>Estado: <span style={{ color: 'red', fontWeight: 'semibold' }}>❌ No Registrado</span></h4>
                                ) : (
                                    <h4 style={{ color: 'black', marginBottom: '10px' }}>Estado: <span style={{ color: 'green', fontWeight: 'semibold' }}>✅ Registrado</span></h4>
                                )}
                            </p>
                            {/* <p><strong>Ultima Fecha de Registro:</strong> {itemData.FECHA_REGISTRO ? new Date(itemData.FECHA_REGISTRO).toLocaleDateString() : 'No Registrado'}</p> */}
                            <p>
                                {itemData.DISPOSICION === 0 ? (
                                    <h4 style={{ color: 'black', marginBottom: '10px' }}>Disposición: <span style={{ color: 'red', fontWeight: 'semibold' }}>❌ No </span></h4>
                                ) : (
                                    <h4 style={{ color: 'black', marginBottom: '10px' }}>Disposición: <span style={{ color: 'green', fontWeight: 'semibold' }}>✅ Si</span></h4>
                                )}
                            </p>
                            <h4 style={{ color: 'black', marginBottom: '10px' }}>Fecha de Alta: <strong>{itemData.FECHA_ALTA ? itemData.FECHA_ALTA : 'No Registrado'}</strong></h4>
                            <h4 style={{ color: 'black', marginBottom: '10px' }}>Ultima Fecha de Registro: <strong>{itemData.FECHA_REGISTRO ? new Date(itemData.FECHA_REGISTRO).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'No Registrado'}</strong></h4>
                        </div>
                    </div>
                </div>
            ) : (
                barcode && <p>No se encontró ningún item con el ID ingresado.</p>
            )}
        </div>
    );
};

export default CodePropertyComp;
