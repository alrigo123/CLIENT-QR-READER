import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CompRealTimeSearch = () => {
    const [searchId, setSearchId] = useState(''); // Guarda el valor ingresado en el input
    const [itemData, setItemData] = useState(null); // Guarda los datos del item encontrado

    // Función que maneja el cambio en el input
    const handleInputChange = (e) => {
        setSearchId(e.target.value); // Actualiza el estado con el valor del input
    };

    // useEffect para hacer la búsqueda cuando cambia el valor del input
    useEffect(() => {
        const fetchItem = async () => {
            if (searchId !== '') {  // Si hay algún valor en el input
                try {
                    const response = await axios.get(`http://localhost:3030/items/${searchId}`);
                    setItemData(response.data); // Actualiza el estado con los datos del item
                } catch (error) {
                    console.log('Error al obtener el item:', error);
                    setItemData(null); // Reinicia el estado si no se encuentra el item
                }
            } else {
                setItemData(null); // Si el input está vacío, limpia la vista
            }
        };

        fetchItem();
    }, [searchId]); // Se ejecuta cada vez que searchId cambia

    return (
        <div className="container">
            <Link to="/items" className="btn btn-success">
                VER ITEMS
            </Link>
            <h2>Búsqueda en Tiempo Real</h2>
            <input
                type="text"
                placeholder="Ingrese ID del item"
                value={searchId}
                onChange={handleInputChange}
                className="form-control mb-3"
            />

            {itemData ? (
                <div>
                    <h3>Resultados:</h3>
                    <p><strong>ID:</strong> {itemData.id}</p>
                    <p><strong>Nombre:</strong> {itemData.Nombre}</p>
                    <p><strong>Oficina:</strong> {itemData.Oficina}</p>
                    <p><strong>Categoria:</strong> {itemData.Categoria}</p>
                    <p><strong>Fecha Registro:</strong> {new Date(itemData.Fecha_Registro).toLocaleDateString()}</p>
                    <p><strong>Estado:</strong> {itemData.Estado}</p>
                    <p><strong>Estado:</strong> {itemData.Estado === 0 ? "❌No Registrado" : "✅ Registrado"}</p>
                </div>
            ) : (
                searchId && <p>No se encontró ningún item con el ID ingresado.</p>
            )}
        </div>
    );
};

export default CompRealTimeSearch;