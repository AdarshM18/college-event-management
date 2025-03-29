import { useState } from 'react';

export default function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, email: 'admin@college.edu', role: 'admin' },
    { id: 2, email: 'student1@college.edu', role: 'student' },
  ]);

  const [newUser, setNewUser] = useState({ email: '', role: '' }); // State for new user
  const [editingUserId, setEditingUserId] = useState(null); // Track which user is being edited
  const [editedUser, setEditedUser] = useState({ email: '', role: '' }); // Store edited user details

  // Handle Add User
  const handleAddUser = () => {
    if (newUser.email.trim() && newUser.role.trim()) {
      const newUserId = users.length ? users[users.length - 1].id + 1 : 1; // Generate new ID
      const userToAdd = { id: newUserId, ...newUser };
      setUsers([...users, userToAdd]); // Add new user to the list
      setNewUser({ email: '', role: '' }); // Reset form
    } else {
      alert('Please fill in all fields.');
    }
  };

  // Handle Edit Button Click
  const handleEditClick = (user) => {
    setEditingUserId(user.id); // Set the user ID being edited
    setEditedUser({ email: user.email, role: user.role }); // Initialize edit form with current values
  };

  // Handle Save Button Click (Save Edited User)
  const handleSaveClick = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === editingUserId ? { ...user, ...editedUser } : user
      )
    );
    setEditingUserId(null); // Exit edit mode
    setEditedUser({ email: '', role: '' }); // Reset edited user state
  };

  // Handle Cancel Button Click (Cancel Editing)
  const handleCancelClick = () => {
    setEditingUserId(null); // Exit edit mode without saving changes
    setEditedUser({ email: '', role: '' }); // Reset edited user state
  };

  // Handle Delete Button Click
  const handleDeleteClick = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-college-primary mb-6">User Management</h1>

      {/* Add User Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
        <form className="grid grid-cols-3 gap-4">
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="p-2 border rounded"
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="p-2 border rounded"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
          </select>
          <button
            type="button"
            onClick={handleAddUser}
            className="bg-college-primary text-white py-2 px-4 rounded hover:bg-blue-900"
          >
            Add User
          </button>
        </form>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-college-secondary">
            <tr>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                {/* Render Editable Fields if Editing */}
                {editingUserId === user.id ? (
                  <>
                    <td className="px-6 py-4">
                      <input
                        type="email"
                        value={editedUser.email}
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, email: e.target.value })
                        }
                        className="p-2 border rounded w-full"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={editedUser.role}
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, role: e.target.value })
                        }
                        className="p-2 border rounded w-full"
                      >
                        <option value="admin">Admin</option>
                        <option value="student">Student</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={handleSaveClick}
                        className="text-green-600 hover:text-green-800"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelClick}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    {/* Render Static Fields if Not Editing */}
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => handleEditClick(user)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(user.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
