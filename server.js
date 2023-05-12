const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();
const path = require("path");

const app = express();
const port = 5000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.use(cors());
app.use(express.json());

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("Connected to MySQL database...");
  connection.release();
});

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});

// mengambil data pada tbl_siswa
app.get("/api/dataSiswa", (req, res) => {
  const sql = "SELECT * FROM tbl_siswa";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// menambahkan data pada tbl_siswa
app.post("/api/dataSiswa", upload.single("foto"), (req, res) => {
  const { nis, nama, jk, umur } = req.body;
  const pic_siswa = req.file.filename;
  const sql = `INSERT INTO tbl_siswa (id_siswa , nis, nm_siswa, jk, umur, pic_siswa) VALUES ('', '${nis}', '${nama}', '${jk}', '${umur}', '${pic_siswa}')`;
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.json({ message: "Data berhasil ditambahkan." });
  });
});

// mengambil data siswa berdasarkan ID
app.get("/api/dataSiswa/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM tbl_siswa WHERE id_siswa = ?";
  pool.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// memperbarui data siswa berdasarkan ID
app.put("/api/dataSiswa/:id", (req, res) => {
  const id = req.params.id;
  const { nis, nm_siswa, jk, umur } = req.body;
  const sql =
    "UPDATE tbl_siswa SET nis = ?, nm_siswa = ?, jk = ?, umur = ? WHERE id_siswa = ?";
  pool.query(sql, [nis, nm_siswa, jk, umur, id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Data berhasil diperbarui." });
  });
});

// menghapus data siswa berdasarkan ID
app.delete("/api/dataSiswa/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM tbl_siswa WHERE id_siswa = ?";
  pool.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json({ message: "Data berhasil dihapus." });
  });
});
