import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-success text-white py-3 mb-3">
            <div className="container d-flex align-items-center">
                <Link to="/" className="d-flex align-items-center text-white text-decoration-none">
                    <img
                        src="https://www.gob.pe/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MTQ1MjczLCJwdXIiOiJibG9iX2lkIn19--2cf59ceccb2713fbc9f17ce81ee16909199760c5/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOltudWxsLDQ4XX0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--830247c4bafe7cadca50817d8559bf1a09e3aa28/LOGO%20GERAGRI1-4.png"
                        alt="Logo"
                        className="me-3"
                        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                    />
                    <h1 className="mb-0">Aplicación de Inventario</h1>
                </Link>
            </div>
        </header>
    );
};

export default Header;

