// import PatientController
const PatientController = require('../controllers/PatientController');

// import express
const express = require("express");

// membuat object router
const router = express.Router();

/**
 * Membuat routing utama
 */
router.get("/", (req, res) => {
  res.send("Hello Covid API Express");
});

// Membuat routing patient
// Mengambil semua data pasien
router.get("/patients", (req, res) => {
  PatientController.index(req, res);
});

// Menambahkan pasien baru
router.post("/patients", (req, res) => {
  PatientController.store(req, res);
});

// Mengupdate/memperbaruin pasien berdasarkan id
router.put("/patients/:id", (req, res) => {
  PatientController.update(req, res);
});

// Menghapus pasien berdasarkan id
router.delete("/patients/:id", (req, res) => {
  PatientController.destroy(req, res);
});

// Mengambil detail data pasien berdasarkan id
router.get("/patients/:id", PatientController.show); 

// Mencari pasien berdasarkan namanya
router.get("/patients/search/:name", PatientController.search); 

// Mengambil Pasien yang statusnya positif
router.get("/patients/status/positive", PatientController.positive); 

// Mengambil Pasien yang statusnya sembuh
router.get("/patients/status/recovered", PatientController.recovered); 

// Mengambil Pasien yang statusnya meninggal
router.get("/patients/status/dead", PatientController.dead);

// export router
module.exports = router;
