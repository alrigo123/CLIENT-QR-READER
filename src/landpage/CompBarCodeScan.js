import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CompBarcodeScanner = () => {
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
        <div className="container">
            <h2>Escaneo de Código de Barras</h2>
            <Link to="/items" className="btn btn-success">
                VER ITEMS
            </Link>
            <input 
                type="text" 
                placeholder="Escanea el código de barras" 
                value={barcode} 
                onChange={handleInputChange} 
                className="form-control mb-3" 
            />
            
            {itemData ? (
                <div>
                    <h3>Información del Item:</h3>
                    <p><strong>ID:</strong> {itemData.id}</p>
                    <p><strong>Nombre:</strong> {itemData.Nombre}</p>
                    <p><strong>Oficina:</strong> {itemData.Oficina}</p>
                    <p><strong>Categoria:</strong> {itemData.Categoria}</p>
                    <p><strong>Fecha Registro:</strong> {new Date(itemData.Fecha_Registro).toLocaleDateString()}</p>
                    <p><strong>Estado:</strong> {itemData.Estado}</p>
                    <button onClick={updateItemStatus} className="btn btn-success">Actualizar Estado y Fecha</button>
                </div>
            ) : (
                barcode && <p>No se encontró ningún item con el ID ingresado.</p>
            )}
        </div>
    );
};

export default CompBarcodeScanner;