import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

const DataEskul = () => {

  return (
    <div>
      <h1>Data Eskul</h1>
      <Button
        className="mb-2"
        variant="outline-primary"
      >
        Tambah Eskul
      </Button>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>Nama</th>
            <th>Anggota</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  );
};

export default DataEskul;