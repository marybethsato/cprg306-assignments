"use client";

import { useState } from "react";
import Item from "./item";


export default function ItemList({ items = [] }) {
    const [sortBy, setSortBy] = useState("name");

    const sortedItems = [...items].sort((a, b) => {
        if (sortBy === "name") {
            return a.name.localeCompare(b.name);
        } else if (sortBy === "category") {
            return a.category.localeCompare(b.category);
        }
        return 0;
    });

    return (
        <div>
            <div className="p-2 max-w-m flex gap-6">
                <label className="p-2">
                    Sort by:
                </label>
                <button className={`${sortBy == 'name' ? 'bg-blue-600 font-bold' : 'bg-blue-900 text-black'} p-2 rounded`} onClick={() => setSortBy("name")}>Name</button>
                <button className={`${sortBy == 'category' ? 'bg-blue-600 font-bold' : 'bg-blue-900 text-black'} p-2 rounded`} onClick={() => setSortBy("category")}>Category</button>
            </div>
            <ul>
                {sortedItems.map((item) => (
                    <Item
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        category={item.category}
                    />
                ))
                }
            </ul>
        </div>
    );
}




