"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { addItem, deleteItem, getItems } from "../_services/shopping-list-service";
import { useUserAuth } from "../_utils/auth-context";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import { NewItem } from "./new-item";

export default function Page() {
  const { user, firebaseSignOut } = useUserAuth();
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
        loadItems();
      }

      if (!localLoading && user == null) {
        router.push("/week-10");
      }

      return () => clearTimeout(timeoutId);
    }
  }, [user, router, localLoading]);

  const [items, setItems] = useState([]);
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

  async function logout() {
    await firebaseSignOut();
  }

  async function handleAddItem(id, name, quantity, category) {
    const newItem = { name, quantity, category };
    console.log(user.uid);
    await addItem(user.uid, newItem);
    await loadItems();
  }

  async function handleDeleteItem(item) {
    await deleteItem(user.uid, item.id);
    await loadItems();
  }

  async function loadItems() {
    setItems(await getItems(user.uid));
  }

  if (localLoading) return <p>Loading...</p>;

  return (
    user == null ? (
      <p>Redirecting...</p>
    ) : (
      <div>
        <div className="flex flex-row items-center justify-between p-2">
          <p className="center text-white  text-2xl">
            Welcome, {user.displayName} {user.email}!
          </p>
          <button className="px-4 py-2 bg-white text-black rounded hover:bg-blue-700 transition" onClick={logout}>Logout</button>

        </div>
        <div className=" h-px bg-gray-800 m-2"></div>
        <h2 className="text-3xl font-bold m-2">Shopping List</h2>
        <div className="flex row">
          <div>
            <NewItem onAddItem={handleAddItem} />
            <ItemList items={items} onItemSelect={handleItemSelect} onItemDelete={handleDeleteItem}></ItemList>
          </div>

          <MealIdeas ingredient={selectedItemName}></MealIdeas>
        </div>
      </div>
    )
  );
}
