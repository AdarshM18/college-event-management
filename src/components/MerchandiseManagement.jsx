import { useState } from 'react'

export default function MerchandiseManagement() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'College T-Shirt',
      price: 499,
      stock: 100,
      status: 'available'
    }
  ])

  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    stock: '',
    status: 'available'
  })

  const [editingItemId, setEditingItemId] = useState(null)
  const [editedItem, setEditedItem] = useState({
    name: '',
    price: '',
    stock: '',
    status: 'available'
  })

  const handleAddItem = (e) => {
    e.preventDefault()
    setItems([...items, { ...newItem, id: items.length + 1 }])
    setNewItem({ name: '', price: '', stock: '', status: 'available' })
  }

  const handleEditClick = (item) => {
    setEditingItemId(item.id)
    setEditedItem(item)
  }

  const handleSaveEdit = () => {
    setItems(items.map(item => 
      item.id === editingItemId ? { ...editedItem, id: editingItemId } : item
    ))
    setEditingItemId(null)
    setEditedItem({ name: '', price: '', stock: '', status: 'available' })
  }

  const handleCancelEdit = () => {
    setEditingItemId(null)
    setEditedItem({ name: '', price: '', stock: '', status: 'available' })
  }

  const handleDeleteItem = (itemId) => {
    setItems(items.filter(item => item.id !== itemId))
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-college-primary mb-6">Merchandise Management</h1>

      {/* Add Item Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
        <form onSubmit={handleAddItem} className="grid grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Item Name"
            className="p-2 border rounded"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            className="p-2 border rounded"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          />
          <input
            type="number"
            placeholder="Stock"
            className="p-2 border rounded"
            value={newItem.stock}
            onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })}
          />
          <select
            className="p-2 border rounded col-span-3"
            value={newItem.status}
            onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
          >
            <option value="available">Available</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
          <button
            type="submit"
            className="col-span-3 bg-college-primary text-white py-2 px-4 rounded hover:bg-blue-900"
          >
            Add Item
          </button>
        </form>
      </div>

      {/* Merchandise Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-college-secondary">
            <tr>
              <th className="px-6 py-3 text-left">Item Name</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Stock</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b">
                <td className="px-6 py-4">
                  {editingItemId === item.id ? (
                    <input
                      type="text"
                      value={editedItem.name}
                      onChange={(e) => setEditedItem({...editedItem, name: e.target.value})}
                      className="p-1 border rounded"
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingItemId === item.id ? (
                    <input
                      type="number"
                      value={editedItem.price}
                      onChange={(e) => setEditedItem({...editedItem, price: e.target.value})}
                      className="p-1 border rounded"
                    />
                  ) : (
                    `₹${item.price}`
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingItemId === item.id ? (
                    <input
                      type="number"
                      value={editedItem.stock}
                      onChange={(e) => setEditedItem({...editedItem, stock: e.target.value})}
                      className="p-1 border rounded"
                    />
                  ) : (
                    item.stock
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingItemId === item.id ? (
                    <select
                      value={editedItem.status}
                      onChange={(e) => setEditedItem({...editedItem, status: e.target.value})}
                      className="p-1 border rounded"
                    >
                      <option value="available">Available</option>
                      <option value="out-of-stock">Out of Stock</option>
                    </select>
                  ) : (
                    <span className={`px-2 py-1 rounded ${item.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {item.status}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 space-x-2">
                  {editingItemId === item.id ? (
                    <>
                      <button 
                        onClick={handleSaveEdit}
                        className="text-green-600 hover:text-green-800"
                      >
                        Save
                      </button>
                      <button 
                        onClick={handleCancelEdit}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => handleEditClick(item)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
