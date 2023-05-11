import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import DataSiswa from "./components/DataSiswa";
import TambahSiswa from "./components/TambahSiswa";
import DataEskul from "./components/DataEskul";
import EditSiswa from "./components/EditSiswa";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<DataSiswa />} />
        <Route path="/tambahSiswa" element={<TambahSiswa />} />
        <Route path="/editSiswa/:id" element={<EditSiswa />} />
        <Route path="/dataEskul" element={<DataEskul />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;