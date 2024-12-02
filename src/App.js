import React, { useState } from 'react';
import './App.css';
import DynamicForm from './components/DynamicForm';
import ProgressBar from './components/ProgressBar';
import SubmittedDataTable from './components/SubmittedDataTable';

const App = () => {
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState([]);
  const [formType, setFormType] = useState("User Information"); // Default form type set to "User Information"

  // Handle form submission
  const handleFormSubmit = (data) => {
    setFormData([...formData, data]);
    alert("Form submitted successfully!");
  };

  // Handle edit action
  const handleEdit = (index, updatedData) => {
    const updatedFormData = [...formData];
    updatedFormData[index] = updatedData; // Update the specific entry
    setFormData(updatedFormData);
    alert("Entry updated successfully!");
  };

  // Handle delete action
  const handleDelete = (index) => {
    const updatedFormData = formData.filter((_, i) => i !== index); // Remove the entry
    setFormData(updatedFormData);
    alert("Entry deleted successfully!");
  };

  return (
    <div className="App">
      {/* Header */}
      <div className="app-header">
        <h1>Dynamic Form Application</h1>
      </div>

      {/* Form Type Selector */}
      <div className="form-selector">
        <label htmlFor="formType">Select Form Type:</label>
        <select
          id="formType"
          onChange={(e) => setFormType(e.target.value)}
          value={formType} // Set the value to the current formType state
        >
          <option value="User Information">User Information</option>
          <option value="Address Information">Address Information</option>
          <option value="Payment Information">Payment Information</option>
        </select>
      </div>

      {/* Render Dynamic Form */}
      {formType && (
        <DynamicForm
          formType={formType}
          onSubmit={handleFormSubmit}
          setProgress={setProgress}
        />
      )}

      {/* Progress Bar */}
      <ProgressBar progress={progress} />

      {/* Display Submitted Data Table */}
      <SubmittedDataTable 
        data={formData} 
        onDelete={handleDelete}  // Pass onDelete function
        onEdit={handleEdit}      // Pass onEdit function
      />

      {/* Footer */}
      <footer>
        <p>&copy; 2024 Akash. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default App;
