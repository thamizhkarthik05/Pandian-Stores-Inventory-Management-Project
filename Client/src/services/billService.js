const API_URL = 'http://localhost:5000/api/bills';

// CREATE BILL
export const createBill = async (data) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error('Failed to create bill');
  }

  return res.json(); // 🔑 VERY IMPORTANT
};

// GET ALL BILLS
export const getBills = async () => {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error('Failed to fetch bills');
  }

  return res.json();
};
