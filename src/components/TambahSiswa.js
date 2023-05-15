import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { hash } from "bcryptjs";
import { useNavigate } from "react-router-dom";

const TambahSiswa = () =>{
    const [siswa, setSiswa] = useState({
        nis: "",
        nama: "",
        jk: "",
        umur: "",
        foto: null,
        password: "",
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name === "foto") {
            setSiswa({ ...siswa, foto: files[0] });
        } else {
            setSiswa({ ...siswa, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const hashedPassword = await hash(siswa.password, 10);
          const formData = new FormData();
          formData.append("nis", siswa.nis);
          formData.append("nama", siswa.nama);
          formData.append("jk", siswa.jk);
          formData.append("umur", siswa.umur);
          formData.append("foto", siswa.foto); // tambahkan file gambar ke FormData
          formData.append("password", hashedPassword); // tambahkan password yang sudah di-hash ke FormData
          const response = await axios.post(
            "http://localhost:5000/api/dataSiswa",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.data) {
            alert(response.data.message);
            setSiswa({ nis: "", nama: "", jk: "", umur: "", foto: null, password:"" });
            navigate("/dataSiswa");
          }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div>
            <h1>Tambah Data Siswa XI TIP</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formNis">
                <Form.Label>NIS</Form.Label>
                <Form.Control
                    type="text"
                    name="nis"
                    value={siswa.nis}
                    onChange={handleChange}
                    placeholder="Masukkan NIS"
                />
                </Form.Group>
                <Form.Group controlId="formNama">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                    type="text"
                    name="nama"
                    value={siswa.nama}
                    onChange={handleChange}
                    placeholder="Masukkan Nama"
                />
                </Form.Group>
                <Form.Group controlId="formJk">
                <Form.Label>Jenis Kelamin</Form.Label>
                <Form.Control
                    as="select"
                    name="jk"
                    value={siswa.jk}
                    onChange={handleChange}
                >
                    <option value="">-- Pilih Jenis Kelamin --</option>
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                </Form.Control>
                </Form.Group>
                <Form.Group controlId="formUmur">
                <Form.Label>Umur</Form.Label>
                <Form.Control
                    type="text"
                    name="umur"
                    value={siswa.umur}
                    onChange={handleChange}
                    placeholder="Masukkan Umur"
                />
                </Form.Group>
                <Form.Group controlId="formGambar">
                    <Form.Label>Gambar</Form.Label>
                    <Form.Control
                    type="file"
                    name="foto"
                    onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formUmur">
                    <Form.Label>Umur</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={siswa.password}
                        onChange={handleChange}
                        placeholder="Masukkan Password"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                Simpan
                </Button>
            </Form>
        </div>
    );
}

export default TambahSiswa;