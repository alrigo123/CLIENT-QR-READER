import logo from './logo.svg';
import './App.css';

import CompRealTimeSearch from './landpage/CompRealTimeSearch.js'; // Ajusta la ruta según tu estructura
import CompShowItems from './landpage/ShowItems.js';
import CompBarcodeScanner from './landpage/CompBarCodeScan.js';
import Header from './landpage/Header.js';
// import CompCreateBlog from './Blog/CreateBlog';
// import CompEditBlog from './Blog/EditBlog';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        </header> */}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<CompBarcodeScanner />} />
          {/* < />  CompRealTimeSearch */}
          <Route path="/items" element={<CompShowItems />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;