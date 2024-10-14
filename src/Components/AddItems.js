import React from "react";
import {FaPlus} from 'react-icons/fa'

const AddItems = ({newItem,setNewItem,handleSubmit}) => {
  return (
    <form className="addForm" onSubmit={handleSubmit}>
    <label htmlFor="addItem">Add Item</label>
    <input
      type="text"
      autoFocus
      id="addItem"
      placeholder="Add Items"
      required
      value={newItem}
      onChange={(e) => setNewItem(e.target.value)}
    />
    <button type="submit">
      <FaPlus />
    </button>
  </form>
    
  );
};

export default AddItems;
