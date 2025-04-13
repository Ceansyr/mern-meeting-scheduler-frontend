import React from 'react';

const FormInput = ({ 
  id, 
  name, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  required = false,
  label
}) => {
  return (
    <div className="input-group">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default FormInput;