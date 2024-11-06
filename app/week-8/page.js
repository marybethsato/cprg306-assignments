"use client";

import { useState } from "react";
import ItemList from "./item-list";
import itemsData from "./items.json";
import MealIdeas from "./meal-ideas";
import { NewItem } from "./new-item";

export default function Page() {

  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  const handleItemSelect = (item) => {
    // removes the emojis
    var cleanedName = item.name.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');

    // removes the quantities
    cleanedName = cleanedName.split(",")[0];
    cleanedName - cleanedName.trim();
    setSelectedItemName(cleanedName);
  };

  function handleAddItem(id, name, quantity, category) {
    const newItem = { id: id, name: name, quantity: quantity, category: category }; // Example new item
    setItems([...items, newItem]);
  }

  return (
    <main>
      <h2 className="text-3xl font-bold m-2">Shopping List</h2>
      <div className="flex row">
        <div>
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect}></ItemList>
        </div>

        <MealIdeas ingredient={selectedItemName}></MealIdeas>
      </div>

    </main>
  );
}