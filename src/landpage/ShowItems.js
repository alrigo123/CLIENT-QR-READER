import axios from 'axios';
import { useState, useEffect } from 'react'; //hooks
import { Link } from 'react-router-dom';

const URI = 'http://localhost:3030/items/';  // we declare the end point /blogs/ wich is the principal route (get all .json) 

const CompShowItems = () => {

    //hooks settings
    //declare blogs who will have a value , and setBlog to tell him the state, equals to a array type of state
    const [items, setItem] = useState([]);

    // para iniciar la api y que se renderize primero ,en el segundo parametro elementos de los que depende osea los que pueden variar en la entrada de datos
    useEffect(() => {
        getItems();
    }, []);

    //show all blogs
    const getItems = async () => {
        // con axios obtenemos la ruta que le pusimos el endpoint 
        const response = await axios.get(URI)

        //y el estado de de setBlog sera la respuesta del json de la URI ,con .data osea obtner todos los datos de la respuesta
        setItem(response.data);
    }

    //delete blog
    const deleteItem = async (id) => {
        //para eliminar solo se le pasa el parametro del id osea concatena el endpoint mas el id que sera del usuaior como parametro
        await axios.delete(`${URI}${id}`)
        //no use state porque usar getblog ya tiene un response
        getItems();
    }

    // Función para formatear la fecha
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    // Función para cambiar el estado de un item
    const toggleEstado = async (id, currentEstado) => {
        // Define el nuevo estado en base al estado actual
        const nuevoEstado = currentEstado === 1 ? 0 : 1;

        // Realiza la actualización en la base de datos
        await axios.put(`${URI}${id}`, { Estado: nuevoEstado });

        // Actualiza el estado en el frontend para reflejar el cambio sin recargar
        setItem(items.map(item =>
            item.id === id ? { ...item, Estado: nuevoEstado } : item
        ));
    };

    return (
        <div className="container">
                    <Link to="/" className="btn btn-warning">
                        Volver al inicio
                    </Link>
            <div className="row">
                <div className="col">
                    <Link to="/create" className="btn btn-primary mt-2 mb-2">AGREGAR ITEM<i className="fas fa-plus"></i></Link>
                    <table className="table">
                        <thead className="table-primary">
                            <tr>
                                <th>Nro Patrimonio</th>
                                <th>Nombre</th>
                                <th>Oficina</th>
                                <th>Categoria</th>
                                <th>Fecha Registro</th>
                                <th>Estado</th>
                                {/* <th>Estado Carac</th> */}
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* con el map lo que se hara es crear un arreglo con los datos que esta pasando blogs el cual es el setBlog el cual es el mismo que el json, entonces luego cada blog tendra un id y un titulo y un contenido por defecto */}
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.Nombre}</td>
                                    <td>{item.Oficina}</td>
                                    <td>{item.Categoria}</td>
                                    <td>{formatDate(item.Fecha_Registro)}</td>
                                    {/* <td>{item.Estado}</td> */}
                                    <td>{item.Estado === 0 ? "❌No Registrado" : "✅ Registrado"}</td>
                                    <td>
                                        {/* Botón para cambiar el estado */}
                                        <button onClick={() => toggleEstado(item.id, item.Estado)} className="btn btn-secondary mx-2">
                                            {item.Estado === 0 ? "Marcar como Registrado" : "Marcar como No Registrado"}
                                        </button>

                                        {/* en esta parte se usa link para combinar un parametro dado del json obtenido como arreglo, y el endopint de edit, en este caso esta usando en un boton para obtener un id e identificarlo */}
                                        <Link to={`/edit/${item.id}`} className="btn btn-info mx-2"><i className="fas fa-edit"></i></Link>

                                        {/* in the button we have a function which requieres as parameters the id of the blog json array and pick the id then comes the function who has a useState in steps, first get the method with state hops */}
                                        <button onClick={() => deleteItem(item.id)} className="btn btn-danger"><i className="fas fa-trash-alt"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

//export the class an send it
export default CompShowItems;