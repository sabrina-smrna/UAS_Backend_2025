// import Model Patient
const Patient = require("../models/Patient");

// buat class PatientController
class PatientController {
  // Get ALl Resource
  async index(req, res) {
    // memanggil method static all dengan async await.
    const patients = await Patient.all();

    if (patients.length > 0) {
      const data = {
        message: "Menampilkkan seluruh resource patients",
        data: patients,
      };

      // The reqeust succeeded
      return res.status(200).json(data);
    } else {
      const data = {
        message: "Patients is empty",
      };

      // Resource not found
      return res.status(404).json(data);
    }
  }

  // Add new resource
  async store(req, res) {
    /**
     * Validasi sederhana
     * - Handle jika salah satu data tidak dikirim
     */

    // destructuring object req.body
    const { name, phone, address, status } = req.body;

    if (!name || !phone || !address || !status) {
      const data = {
        message: "All field must be filled correctly",
      };

      // Unprocessable Entity
      return res.status(422).json(data);
    } else {
      const patient = await Patient.create(req.body);

      const data = {
        message: "Menampilkan resource yang berhasil ditambahkan",
        data: patient,
      };

      // Resource created
      return res.status(201).json(data);
    }
  }

  // Edit resource
  async update(req, res) {
    const { id } = req.params;
    // cari id patient yang akan diupdate
    const patient = await Patient.find(id);

    if (patient) {
      // melakukan update data patient
      const patients = await Patient.update(req.body, id);
      const data = {
        message: `Resource patient id ${id} is updated successfully`,
        data: patients,
      };

      // The reqeust succeeded
      return res.status(200).json(data);
    } else {
      // jika id patient tidak ditemukan
      const data = {
        message: `Resource patient id ${id} not found`,
      };

      // Resource not found
      return res.status(404).json(data);
    }
  }

  // Delete resource
  async destroy(req, res) {
    const { id } = req.params;
    const patient = await Patient.find(id);

    if (patient) {
      await Patient.delete(id);
      const data = {
        message: `Resource patient id ${id} is deleted successfully`,
        data: patient,
      };

      // The reqeust succeeded
      return res.status(200).json(data);
    } else {
      // jika id patient tidak ditemukan
      const data = {
        message: `Resource patient id ${id} not found`,
      };

      // Resource not found
      return res.status(404).json(data);
    }
  }

  // Get one resource
  async show(req, res) {
    const { id } = req.params;
    const patient = await Patient.find(id);

    if (patient) {
      const data = {
        message: `Menampilkan single resource patient id ${id}`,
        data: patient,
      };

      // The reqeust succeeded
      return res.status(200).json(data);
    } else {
      const data = {
        message: `Resource patient id ${id} not found`,
      };

      // Resource not found
      return res.status(404).json(data);
    }
  }

  // Search resource
  async search(req, res) {
    const { name } = req.params;
    const patient = await Patient.search(name);

    if (patient.length > 0) {
      const data = {
        message: `Menampilkan semua resource patient dengan nama ${name} yang berhasil dicari`,
        data: patient,
      };

      // The reqeust succeeded
      return res.status(200).json(data);
    } else {
      const data = {
        message: `Resource patient dengan nama ${name} not found`,
      };

      // Resource not found
      return res.status(404).json(data);
    }
  }

  // Get Positive Resource
  async positive(req, res) {
    const status = "positive";
    const patient = await Patient.findByStatus(status);
    const total = await Patient.total(status);

    if (patient) {
      const data = {
        message: `Menampilkan patient yang ${status}`,
        total: total,
        data: patient,
      };

      // The reqeust succeeded
      return res.status(200).json(data);
    } else {
      const data = {
        message: `Data patient yang ${status} tidak ditemukan`,
      };

      // Resource not found
      return res.status(404).json(data);
    }
  }

  // Get Recovered Resource
  async recovered(req, res) {
    const status = "recovered";
    const patient = await Patient.findByStatus(status);
    const total = await Patient.total(status);

    if (patient) {
      const data = {
        message: `Menampilkan patient yang sembuh`,
        total: total,
        data: patient,
      };

      // The reqeust succeeded
      return res.status(200).json(data);
    } else {
      const data = {
        message: `Data patient yang sembuh tidak ditemukan`,
      };

      // Resource not found
      return res.status(404).json(data);
    }
  }

  // Get Dead Resource
  async dead(req, res) {
    const status = "dead";
    const patient = await Patient.findByStatus(status);
    const total = await Patient.total(status);

    if (patient) {
      const data = {
        message: `Menampilkan patient yang meninggal`,
        total: total,
        data: patient,
      };

      // The reqeust succeeded
      return res.status(200).json(data);
    } else {
      const data = {
        message: `Data patient yang meninggal tidak ditemukan`,
      };

      // Resource not found
      return res.status(404).json(data);
    }
  }
}

// membuat object PatientController
const object = new PatientController();

// export object PatientController
module.exports = object;