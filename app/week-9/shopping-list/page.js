"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserAuth } from "../_utils/auth-context";
import ItemList from "./item-list";
import itemsData from "./items.json";
import MealIdeas from "./meal-ideas";
import { NewItem } from "./new-item";

export default function Page() {
  const { user } = useUserAuth();
  const router = useRouter();

  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    if (user !== undefined) {
      const timeoutId = setTimeout(() => {
        setLocalLoading(false);
      }, 1000);

      if (user) {
        clearTimeout(timeoutId);
        setLocalLoading(false);
      }

      if (!localLoading && user == null) {
        router.push("/week-9");
      }

      return () => clearTimeout(timeoutId);
    }
  }, [user, router, localLoading]);

  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  const handleItemSelect = (item) => {
    // Remove emojis and clean up name
    let cleanedName = item.name.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ""
    );
    cleanedName = cleanedName.split(",")[0].trim();
    setSelectedItemName(cleanedName);
  };

  function handleAddItem(id, name, quantity, category) {
    const newItem = { id, name, quantity, category };
    setItems([...items, newItem]);
  }

  if (localLoading) return <p>Loading...</p>;

  return (
    user == null ? (
      <p>Redirecting...</p>
    ) : (
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
    )
  );
}
