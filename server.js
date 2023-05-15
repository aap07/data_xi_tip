const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();
const path = require("path");
const bcrypt = require("bcryptjs");
const fs = require("fs");

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
app.use("/images", express.static(path.join(__dirname, "src/images")));

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("Connected to MySQL database...");
  connection.release();
});

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});

// memeriksa apakah user terautentikasi saat melakukan login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM tbl_siswa WHERE username = ?";
  pool.query(sql, [username], async (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      const isPasswordMatched = await bcrypt.compare(password, result[0].password);
      if (isPasswordMatched) {
        res.json({ message: "Berhasil login." });
      } else {
        res.status(401).json({ message: "Password salah." });
      }
    } else {
      res.status(404).json({ message: "Username tidak ditemukan." });
    }
  });
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
  const { nis, username, nama, jk, umur, password } = req.body;
  const pic_siswa = req.file.filename;
  const sql = `INSERT INTO tbl_siswa (id_siswa , nis, username, nm_siswa, jk, umur, pic_siswa, password) VALUES ('', '${nis}', '${username}', '${nama}', '${jk}', '${umur}', '${pic_siswa}', '${password}')`;
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

// menghapus file gambar
app.delete("/api/images/:filename", (req, res) => {
  const filename = req.params.filename;
  const path = `./src/images/${filename}`;
  fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Gagal menghapus file." });
    } else {
      res.json({ message: "File berhasil dihapus." });
    }
  });
});
