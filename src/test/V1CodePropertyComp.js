import React, { useState, useEffect } from 'react';
import axios from 'axios';

const V1CodePropertyComp = () => {
    const [barcode, setBarcode] = useState(''); // Guarda el valor ingresado en el input
    const [itemData, setItemData] = useState(null); // Guarda los datos del item encontrado

    // Función que maneja el cambio en el input
    const handleInputChange = (e) => {
        setBarcode(e.target.value); // Actualiza el estado con el valor del input
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

    // Función para actualizar el estado y la fecha de registro
    const updateItemStatus = async () => {
        if (itemData) {
            try {
                // Obtiene la fecha actual para actualizar "Fecha_Registro"
                const currentDate = new Date().toISOString();

                // Actualiza el estado y la fecha de registro en la base de datos
                await axios.put(`http://localhost:3030/items/${itemData.id}`, {
                    ...itemData,  // Mantiene otros datos del item sin cambios
                    Estado: 1, // Cambia el estado a 1
                    Fecha_Registro: currentDate // Actualiza la fecha de registro
                });

                // Actualiza localmente el estado y la fecha para reflejar el cambio en la interfaz
                setItemData(prevData => ({ ...prevData, Estado: 1, Fecha_Registro: currentDate }));
            } catch (error) {
                console.log('Error al actualizar el item:', error);
            }
        }
    };

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Buscar por código patrimonial</h2>
            <input
                type="text"
                placeholder="Ingrese código patrimonial"
                value={barcode}
                onChange={handleInputChange}
                className="form-control mb-3"
                style={{ marginBottom: '20px', fontSize: '1rem', padding: '10px' }}
            />


            {itemData ? (
                <div>
                    <h3 className='text-uppercase fw-bolder'>Información del Item</h3>
                    <p><strong>Cod. Patrimonial :</strong> {itemData.CODIGO_PATRIMONIAL}</p>
                    <p><strong>Descripcion :</strong> {itemData.DESCRIPCION}</p>
                    <p><strong>Dependencia :</strong> {itemData.DEPENDENCIA}</p>
                    <p><strong>Trabajador :</strong> {itemData.TRABAJADOR}</p>
                    <p><strong>Estado :</strong> {itemData.ESTADO}</p>
                    <p>
                        {itemData.ESTADO === 0 ? (
                            <span style={{ color: 'red', fontWeight: 'bold' }}>❌ No Registrado</span>
                        ) : (
                            <span style={{ color: 'green', fontWeight: 'bold' }}>✅ Registrado</span>
                        )}
                    </p>
                    {/* <button onClick={updateItemStatus} className="btn btn-success">Actualizar Estado y Fecha</button> */}
                </div>
            ) : (
                barcode && <p>No se encontró ningún item con el ID ingresado.</p>
            )}
        </div>
    );
};

export default V1CodePropertyComp;