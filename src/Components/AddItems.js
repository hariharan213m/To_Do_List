import React from "react";
import {FaPlus} from 'react-icons/fa'

const AddItems = ({newItem,setNewItem,handleSUbmit}) => {
  return (
    <>
    <form className="addForm" onSubmit={handleSUbmit}>
      <label htmlFor="addItem">
        Add Item
      </label>
      <input type="text"
      autoFocus
      id="addItem"
      placeholder="Add Items"
      required value={newItem}
      onChange={(e)=> setNewItem(e.target.value)} />
      <button>
        <FaPlus />
      </button>
    </form>
    </>
    
  );
};

export default AddItems;
