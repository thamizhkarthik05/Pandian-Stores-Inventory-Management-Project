import React, { useState } from 'react';
import EditItemRow from './EditItemRow';
import { Edit2, Trash2 } from 'lucide-react';

const ItemTable = ({ items, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState(null);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-linear-to-r from-sky-600 to-sky-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Item Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Price (₹)</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Stock</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {items.map((item) =>
              editingId === item._id ? (
                <EditItemRow
                  key={item._id}
                  item={item}
                  onSave={(updatedItem) => {
                    onUpdate(updatedItem);
                    setEditingId(null);
                  }}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-800">{item.name}</p>
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                      {item.category}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-bold text-green-600">₹{item.price}</p>
                  </td>

                  <td className="px-6 py-4">
                    <p
                      className={`font-semibold ${
                        item.stock < 50 ? 'text-red-600' : 'text-gray-800'
                      }`}
                    >
                      {item.stock}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingId(item._id)}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>

                      <button
                        onClick={() => onDelete(item._id)}
                        className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        {items.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No items found
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemTable;
