import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TambahSiswa = () =>{
    const [siswa, setSiswa] = useState({
    nis: "",
    nama: "",
    jk: "",
    umur: "",
    foto:null,
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSiswa({ ...siswa, [name]: value });
    };

    const handleFileChange = (event) => {
        setSiswa({ ...siswa, foto: event.target.files[0] });
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    axios
        .post("http://localhost:5000/api/dataSiswa", siswa, {
        headers: {
            "Content-Type": "application/json",
        },
        })
        .then((response) => {
            setSiswa({ nis: "", nama: "", jk: "", umur: "", foto:null });
            navigate("/");
        })
        .catch((err) => console.error(err));
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
                <Button variant="primary" type="submit">
                Simpan
                </Button>
            </Form>
        </div>
    );
}

export default TambahSiswa;