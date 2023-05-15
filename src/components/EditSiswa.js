import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

const EditSiswa = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [siswa, setSiswa] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/dataSiswa/" + id)
      .then((res) => setSiswa(res.data[0]))
      .catch((err) => console.log(err));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSiswa((prevSiswa) => ({
      ...prevSiswa,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:5000/api/dataSiswa/${id}`, siswa
  //     );
  //     if (response.data) {
  //       alert(response.data.message);
  //       navigate("/dataSiswa");
  //       return;
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert(err.message);
  //   }
  // };
    const handleSubmit = async (event) => {
      event.preventDefault();

      // prepare form data
      const formData = new FormData();
      formData.append("foto", selectedFile);
      formData.append("username", siswa.username);
      formData.append("nis", siswa.nis);
      formData.append("nm_siswa", siswa.nama);
      formData.append("jk", siswa.jk);
      formData.append("umur", siswa.umur);

      try {
        const response = await axios.put(
          `http://localhost:5000/api/dataSiswa/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data) {
          alert(response.data.message);
          navigate("/dataSiswa");
          return;
        }
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    };

  return (
    <div>
      <h2>Edit Data Siswa</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formNis">
          <Form.Label>NIS</Form.Label>
          <Form.Control
            type="text"
            name="nis"
            value={siswa.nis}
            onChange={handleInputChange}
            placeholder="Masukkan NIS"
          />
        </Form.Group>
        <Form.Group controlId="formUsername">
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={siswa.username}
            onChange={handleInputChange}
            placeholder="Masukkan Username"
          />
        </Form.Group>
        <Form.Group controlId="formNama">
          <Form.Label>Nama</Form.Label>
          <Form.Control
            type="text"
            name="nama"
            value={siswa.nama}
            onChange={handleInputChange}
            placeholder="Masukkan Nama"
          />
        </Form.Group>
        <Form.Group controlId="formJk">
          <Form.Label>Jenis Kelamin</Form.Label>
          <Form.Control
            as="select"
            name="jk"
            value={siswa.jk}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            placeholder="Masukkan Umur"
          />
        </Form.Group>
        <Form.Group controlId="formGambar">
          <Form.Label>Gambar</Form.Label>
          <Form.Control type="file" name="foto" onChange={handleImageChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Simpan
        </Button>
      </Form>
    </div>
  );
};

export default EditSiswa;
