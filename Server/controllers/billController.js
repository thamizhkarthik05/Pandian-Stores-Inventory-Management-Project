const Bill = require('../models/Bill');
const Item = require('../models/Item');

const generateBillPDF = require('../utils/generateBillPDF');
const sendEmailBill = require('../utils/sendEmailBill');

// ==========================
// CREATE BILL
// ==========================
exports.createBill = async (req, res) => {
  try {
    const { items, paymentMethod, customerEmail } = req.body;

    let grandTotal = 0;
    const processedItems = [];

    for (let billItem of items) {
      const item = await Item.findById(billItem.itemId);

      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }

      if (item.stock < billItem.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${item.name}`,
        });
      }

      // 🔽 Reduce stock
      item.stock -= billItem.quantity;
      await item.save();

      const lineTotal = item.price * billItem.quantity;
      grandTotal += lineTotal;

      // ✅ DO NOT mutate billItem — create clean snapshot
      processedItems.push({
        itemId: item._id,
        name: item.name,
        category: item.category,
        price: item.price,
        quantity: billItem.quantity,
        total: lineTotal,
      });
    }

    const billCount = await Bill.countDocuments();
    const billNumber = `BILL${String(billCount + 1).padStart(4, '0')}`;

    const newBill = new Bill({
      billNumber,
      items: processedItems, // ✅ clean items
      paymentMethod,
      customerEmail,
      total: grandTotal,
    });

    await newBill.save();

    // ==========================
    // PDF + EMAIL
    // ==========================
    const pdfPath = await generateBillPDF(newBill);

    if (customerEmail) {
      await sendEmailBill(customerEmail, pdfPath, billNumber);
    }

    res.status(201).json(newBill);
  } catch (error) {
    console.error('CREATE BILL ERROR 👉', error);
    res.status(500).json({ message: 'Failed to create bill' });
  }
};

// ==========================
// GET ALL BILLS
// ==========================
exports.getBills = async (req, res) => {
  try {
    const bills = await Bill.find().sort({ createdAt: -1 });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bills' });
  }
};

// ==========================
// DOWNLOAD BILL PDF
// ==========================
exports.downloadBillPDF = async (req, res) => {
  try {
    const { id } = req.params;

    const bill = await Bill.findById(id);
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    const pdfPath = await generateBillPDF(bill);
    res.download(pdfPath, `Bill_${bill.billNumber}.pdf`);
  } catch (error) {
    console.error('PDF ERROR 👉', error);
    res.status(500).json({ message: 'Failed to generate bill PDF' });
  }
};
