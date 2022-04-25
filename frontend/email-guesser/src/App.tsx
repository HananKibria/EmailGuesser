import React from "react";
import Email from "./components/email";
import Header from "./components/Header";
import { Routes, Route} from "react-router-dom";
import {Helmet} from 'react-helmet';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import FilesUploadComponent from './components/formatupload';

const App = () => {
  
    return (
        <div className="application">
        <Helmet>
            <style>{'body { background-color: aliceblue; }'}</style>
        </Helmet>
        <div >
        <Header />
        <Routes>
        <Route path="/" element={<Email/>} />
        <Route path="/upload" element={<FilesUploadComponent />} />
        </Routes>
      </div>
    </div>
      
    );
  };
  export default App;
  