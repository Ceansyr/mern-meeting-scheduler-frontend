import React from 'react';

const CategoryButton = ({ category, isActive, onClick }) => {
  return (
    <button
      type="button"
      className={`page-preferences-option ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <div className={`category-icon category-icon-${category.id}`}></div>
      {category.name}
    </button>
  );
};

export default CategoryButton;