import React from 'react'
import { Link } from 'react-router-dom';

const TopBTNs = () => {
    return (
        <div className="container d-flex justify-content-center mt-4">
            <Link to="/items" className="btn btn-success fw-bolder m-2" style={{ backgroundColor: '#ff8800', color: 'white', border: 'none' }}>
                VER ITEMS
            </Link>
            <Link to="/" className="btn btn-warning fw-bolder m-2" style={{ backgroundColor: '#25c0ab', color: 'white', border: 'none' }}>
                BUSQUEDA GENERAL
            </Link>
            <Link to="/codigo-patrimonial" className="btn btn-primary fw-bolder m-2">
                BUSQUEDA CODIGO
            </Link>
            <Link to="/trabajador" className="btn btn-secondary fw-bolder m-2" style={{ backgroundColor: '#901c30', color: 'white', border: 'none' }}>
                BUSQUEDA TRABAJADOR
            </Link>
            <Link to="/dependencia" className="btn btn-light fw-bolder m-2" style={{ backgroundColor: '#98227f', color: 'white', border: 'none' }}>
                BUSQUEDA DEPENDENCIA
            </Link>
        </div>
    );
}

export default TopBTNs