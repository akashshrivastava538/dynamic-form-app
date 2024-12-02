import React, { useState, useEffect } from 'react';

const DynamicForm = ({ formType, onSubmit, setProgress }) => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [errorMessages, setErrorMessages] = useState({});

  // Hardcoded backend API responses for each form type
  const apiResponses = {
    "User Information": {
      fields: [
        { name: "firstName", type: "text", label: "First Name", required: true },
        { name: "lastName", type: "text", label: "Last Name", required: true },
        { name: "age", type: "number", label: "Age", required: false }
      ]
    },
    "Address Information": {
      fields: [
        { name: "street", type: "text", label: "Street", required: true },
        { name: "city", type: "text", label: "City", required: true },
        { name: "state", type: "dropdown", label: "State", options: ["California", "Texas", "New York"], required: true },
        { name: "zipCode", type: "text", label: "Zip Code", required: false }
      ]
    },
    "Payment Information": {
      fields: [
        { name: "cardNumber", type: "text", label: "Card Number", required: true },
        { name: "expiryDate", type: "date", label: "Expiry Date", required: true },
        { name: "cvv", type: "password", label: "CVV", required: true },
        { name: "cardholderName", type: "text", label: "Cardholder Name", required: true }
      ]
    }
  };

  useEffect(() => {
    // Load fields based on form type
    if (formType) {
      setFields(apiResponses[formType].fields);
      setFormData({}); // Reset form data when form type changes
      setProgress(0); // Reset progress when form type changes
    }
  }, [formType, setProgress]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    validateForm(e.target);
  };

  const validateForm = () => {
    const completedFields = Object.values(formData).filter(val => val);
    setProgress((completedFields.length / fields.length) * 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    let valid = true;
    let errors = {};
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        errors[field.name] = `${field.label} is required.`;
        valid = false;
      }
    });

    setErrorMessages(errors);

    if (valid) {
      onSubmit(formData);
      setFormData({}); // Reset form data after submission
      setProgress(0); // Reset progress after submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="dynamic-form">
      <h2>{formType}</h2>
      {fields.map((field) => (
        <div key={field.name} className="form-field">
          <label>{field.label}</label>
          {field.type === "dropdown" ? (
            <select 
              name={field.name} 
              onChange={handleChange}
              value={formData[field.name] || ""}
            >
              <option value="">Select {field.label}</option>
              {field.options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : (
            <input 
              type={field.type} 
              name={field.name} 
              value={formData[field.name] || ""} 
              onChange={handleChange} 
            />
          )}
          {errorMessages[field.name] && <span className="error-message">{errorMessages[field.name]}</span>}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;
