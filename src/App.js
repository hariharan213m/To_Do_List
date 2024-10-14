import AddItems from "./Components/AddItems";
import Content from "./Components/Content";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import apiRequest from "./apiRequest";
import React, { useState, useEffect } from "react";

function App() {
  const API_URL = "http://localhost:3500/items";
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Data not received");
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000);
  }, []);

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addNewItem = { id, checked: false, item };
    const listItems = [...items, addNewItem];
    setItems(listItems);

    const postOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addNewItem),
    };
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  };
  const handleCheck = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  };
  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    const deleteOptions = {
      method: "DELETE",
    }

    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    console.log(newItem);
    addItem(newItem);
    setNewItem("");
  };

  return (
    <div className="App">
      <Header />
      <AddItems
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <main>
        {isLoading && <p>Loading items..</p>}
        {fetchError && <p>{`Error: ${fetchError}`}</p>}
        {!isLoading && !fetchError && (
          <Content
            items={items}
            setItems={setItems}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
