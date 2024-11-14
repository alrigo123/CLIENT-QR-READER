import './App.css';

import GeneralSearchComp from './ItemComponents/GeneralSearchComp.js'; // Ajusta la ruta según tu estructura
import ShowItemsComp from './ItemComponents/ShowItemsComp.js';
import CodePropertyComp from './ItemComponents/CodePropertyComp.js';
import WorkerSearchComp from './ItemComponents/WorkerSearchComp.js';
import DependencySearchComp from './ItemComponents/DependencySearchComp.js';
import DoubleSearch from './ItemComponents/DoubleSearch.js';

// import V1CodePropertyComp from './test/V1CodePropertyComp.js';
// import TESTShowItemsComp from './test/TESTShowItemsComp.js';
// import V1GeneralSearchComp from './test/V1GeneralSearchComp.js';
// import V1WorkerSearchComp from './test/V1WorkerSearchComp.js';
import Header from './NavigationComponents/Header.js';
import TopBTNs from './NavigationComponents/TopBTNs.js';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <TopBTNs />
        <Routes>
          <Route path="/" element={<GeneralSearchComp />} />
          <Route path="/items" element={<ShowItemsComp />} />
          <Route path="/codigo-patrimonial" element={<CodePropertyComp />} />
          <Route path="/trabajador" element={<WorkerSearchComp />} />
          <Route path="/dependencia" element={<DependencySearchComp />} />
          <Route path="/busqueda" element={<DoubleSearch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;