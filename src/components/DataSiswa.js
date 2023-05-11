import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

const DataSiswa = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/dataSiswa")
      .then((response) => setData(response.data))
      .catch((err) => console.error(err));
  };

  const handleEdit = (id) => {
    navigate(`/editSiswa/${id}`);
  };

  const handleTambah = () => {
    navigate(`/tambahSiswa`);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/dataSiswa/${id}`)
      .then(() => fetchData())
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>Data Siswa XI TIP</h1>
      <Button
        onClick={() => handleTambah()}
        className="mb-2"
        variant="outline-primary"
      >
        Tambah Siswa
      </Button>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>NIS</th>
            <th>Nama</th>
            <th>Jenis Kelamin</th>
            <th>Umur</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id_siswa}>
              <td>{item.nis}</td>
              <td>{item.nm_siswa}</td>
              <td>{item.jk}</td>
              <td>{item.umur}</td>
              <td>
                <button onClick={() => handleEdit(item.id_siswa)}>Edit</button>
                <button onClick={() => handleDelete(item.id_siswa)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataSiswa;