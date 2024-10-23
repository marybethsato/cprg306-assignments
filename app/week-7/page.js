"use client";

import { useState } from "react";
import ItemList from "./item-list";
import itemsData from "./items.json";
import { NewItem } from "./new-item";

export default function Page() {

  const [items, setItems] = useState(itemsData);
  
  function handleAddItem(id, name, quantity, category){
    const newItem = { id: id, name: name, quantity: quantity, category: category}; // Example new item
    setItems([...items, newItem]);
  }

    return (
      <main>
        <h2 className="text-3xl font-bold m-2">Shopping List</h2>
        <NewItem onAddItem={handleAddItem} />
        <ItemList items={items}></ItemList>
      </main>
    );
  }