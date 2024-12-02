import React, { useState } from "react";

const SubmittedDataTable = ({ data, onDelete, onEdit }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditData({ ...data[index] }); // Pre-fill editData with the current row's data
  };

  const saveEdit = () => {
    // Update the original data with the edited fields
    if (onEdit && typeof onEdit === "function") {
      const updatedData = { ...data[editingIndex], ...editData }; // Merge existing data with the edited data
      onEdit(editingIndex, updatedData); // Call the onEdit function with updated data
    }
    setEditingIndex(null);
    setEditData({}); // Reset edit data after saving
  };

  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {editingIndex === index
                ? Object.keys(row).map((key) => (
                    <td key={key}>
                      <input
                        type="text"
                        name={key}
                        value={editData[key] || ''} // Use value instead of defaultValue
                        onChange={handleEditChange}
                      />
                    </td>
                  ))
                : Object.values(row).map((value, idx) => <td key={idx}>{value}</td>)}
              <td>
                {editingIndex === index ? (
                  <button onClick={saveEdit}>Save</button>
                ) : (
                  <>
                    <button onClick={() => startEditing(index)}>Edit</button>
                    <button onClick={() => onDelete(index)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmittedDataTable;
