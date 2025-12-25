const API_URL = 'http://localhost:5000/api/items';

// Get all items
export const getItems = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

// Create new item
export const createItem = async (item) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  return res.json();
};

// Update item
export const updateItem = async (id, item) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  return res.json();
};

// Delete item
export const deleteItem = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
};
