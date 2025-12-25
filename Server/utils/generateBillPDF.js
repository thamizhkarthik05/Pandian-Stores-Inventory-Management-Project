// utils/generateBillPDF.js

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

module.exports = function generateBillPDF(bill) {
  return new Promise((resolve, reject) => {
    try {
      const pdfDir = path.join(__dirname, '../pdfs');
      if (!fs.existsSync(pdfDir)) {
        fs.mkdirSync(pdfDir);
      }

      const filePath = path.join(
        pdfDir,
        `Bill_${bill.billNumber}.pdf`
      );

      const doc = new PDFDocument({ size: 'A4', margin: 40 });

      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // ---------- FONTS ----------
      const kavivanar = path.join(__dirname, '../fonts/Kavivanar-Regular.ttf');
      const roboto = path.join(__dirname, '../fonts/Roboto-VariableFont_wght.ttf');

      doc.registerFont('Kavivanar', kavivanar);
      doc.registerFont('Roboto', roboto);

      // ---------- HEADER ----------
      doc
        .font('Kavivanar')
        .fontSize(28)
        .fillColor('#d2a10f')
        .text('பாண்டியன் ஸ்டோர்ஸ்', { align: 'center' });

      doc
        .moveDown(0.3)
        .font('Roboto')
        .fontSize(10)
        .fillColor('#666')
        .text('RETAIL SHOP MANAGEMENT', { align: 'center' });

      doc
        .moveDown(0.5)
        .fontSize(10)
        .text('123 Main Street, City - 123456', { align: 'center' })
        .text('Phone: +91 98765 43210', { align: 'center' });

      // ---------- BILL INFO ----------
      doc.moveDown(2);
      doc.fontSize(10).fillColor('#999');

      doc.text(`Invoice Number`, 40, doc.y);
      doc.fontSize(14).fillColor('#000').text(`#${bill.billNumber}`, 40);

      doc
        .fontSize(10)
        .fillColor('#999')
        .text(`Date & Time`, 400, doc.y - 20);

      doc
        .fontSize(10)
        .fillColor('#000')
        .text(
          new Date(bill.createdAt).toLocaleString('en-IN'),
          400,
          doc.y
        );

      // ---------- TABLE HEADER ----------
      doc.moveDown(2);
      doc.moveTo(40, doc.y).lineTo(550, doc.y).stroke();

      doc.moveDown(0.5);
      doc.fontSize(10).fillColor('#444');

      doc.text('Item Description', 40);
      doc.text('Qty', 300);
      doc.text('Price', 370);
      doc.text('Total', 460);

      doc.moveDown(0.5);
      doc.moveTo(40, doc.y).lineTo(550, doc.y).stroke();

      // ---------- ITEMS ----------
      doc.fontSize(11).fillColor('#000');

      bill.items.forEach(item => {
        doc.moveDown(0.8);
        doc.text(item.name, 40);
        doc.text(item.quantity.toString(), 300);
        doc.text(`₹${item.price}`, 370);
        doc.text(`₹${item.total}`, 460);
      });

      // ---------- SUMMARY ----------
      doc.moveDown(2);
      doc.moveTo(40, doc.y).lineTo(550, doc.y).stroke();

      doc.moveDown(1);
      doc.fontSize(12).fillColor('#555').text('Payment Method', 40);
      doc.fontSize(12).fillColor('#000').text(bill.paymentMethod, 460);

      doc.moveDown(1);
      doc.fontSize(14).font('Roboto').text('Grand Total', 40);
      doc
        .fontSize(18)
        .fillColor('#059669')
        .text(`₹${bill.total}`, 460);

      // ---------- FOOTER ----------
      doc.moveDown(3);
      doc
        .fontSize(11)
        .fillColor('#555')
        .text('Thank you for shopping with us!', { align: 'center' });

      doc
        .moveDown(0.5)
        .fontSize(9)
        .fillColor('#999')
        .text('VISIT AGAIN SOON', { align: 'center' });

      // ---------- FINALIZE ----------
      doc.end();

      stream.on('finish', () => {
        resolve(filePath);
      });

      stream.on('error', err => reject(err));
    } catch (err) {
      reject(err);
    }
  });
};
