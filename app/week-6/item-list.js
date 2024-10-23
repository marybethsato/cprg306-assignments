"use client";

import { useState } from "react";
import Item from "./item";
import itemsData from './items.json';


export default function ItemList() {
    const [items, setItems] = useState(itemsData);

    const [sortBy, setSortBy] = useState("name");

    const groupByCategory = (items) => {
        const grouped = items.reduce((accumulator, item) => {
            if (!accumulator[item.category]) {
                accumulator[item.category] = [];
            }
            accumulator[item.category].push(item);
            return accumulator;
        }, {});

        return Object.entries(grouped);
    };

    function sort(value) {

        setSortBy(value);

        if (value == 'name') {
            const sortedItems = [...itemsData].sort((a, b) =>
                a.name.localeCompare(b.name)
            );
            setItems(sortedItems);
        } else if (value == 'category') {
            const sortedItems = [...itemsData].sort((a, b) =>
                a.category.localeCompare(b.category)
            );
            setItems(sortedItems);
        } else if (value == 'grouped category') {
            const groupedItems = groupByCategory(itemsData); 
            setItems(groupedItems);
        }
    }

    return (
        <div>
            <div className="p-2 m-4 max-w-m flex gap-6">
                <label className="p-2">
                    Sort by:
                </label>
                <button className={`${sortBy == 'name' ? 'bg-blue-600 font-bold' : 'bg-blue-900 text-black'} p-2 rounded`} onClick={() => sort("name")}>Name</button>
                <button className={`${sortBy == 'category' ? 'bg-blue-600 font-bold' : 'bg-blue-900 text-black'} p-2 rounded`} onClick={() => sort("category")}>Category</button>
                <button className={`${sortBy == 'grouped category' ? 'bg-blue-600 font-bold' : 'bg-blue-900 text-black'} p-2 rounded`} onClick={() => sort("grouped category")}>Grouped Category</button>
            </div>

            <ul>
                {sortBy == 'grouped category' ?
                    items.map(([category, categoryItems]) => (
                        <li key={category} className="mb-4">
                            <h2 className="capitalize text-lg font-bold pl-4">{category}</h2>
                            <ul className="pl-4">
                                {categoryItems.map((item) => (
                                    <Item
                                        key={item.id}
                                        name={item.name}
                                        quantity={item.quantity}
                                        category={item.category}
                                    />
                                ))}
                            </ul>
                        </li>
                    )) :
                    items.map((item, index) => (
                        <Item
                            key={index}
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




