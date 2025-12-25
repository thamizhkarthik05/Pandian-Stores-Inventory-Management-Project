const nodemailer = require('nodemailer');
const path = require('path');

const sendEmailBill = async (toEmail, pdfPath, billNumber) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Pandian Stores" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: `Your Bill - ${billNumber}`,
      text: `Thank you for shopping with Pandian Stores.\n\nYour bill is attached as a PDF.`,
      attachments: [
        {
          filename: `Bill_${billNumber}.pdf`,
          path: pdfPath,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    console.log('✅ Email sent successfully to', toEmail);
  } catch (error) {
    console.error('❌ EMAIL SEND FAILED 👉', error.message);
  }
};

module.exports = sendEmailBill;
