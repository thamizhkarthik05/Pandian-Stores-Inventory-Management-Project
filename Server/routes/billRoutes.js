// billRoutes.js

const express = require('express');
const router = express.Router();

const {
  createBill,
  getBills,
  downloadBillPDF   // 👈 ADD THIS
} = require('../controllers/billController');

router.post('/', createBill);
router.get('/', getBills);

// ✅ PDF DOWNLOAD ROUTE
router.get('/:id/pdf', downloadBillPDF);

module.exports = router;
