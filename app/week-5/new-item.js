"use client";

import { useState } from "react";

export function NewItem() {
    const [quantity, setQuantity] = useState(1);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("produce");

    const increment = () => {
        if (quantity < 20) {
            setQuantity(quantity + 1);
        }
    };

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Added item: item:${name}, quantity:${quantity}, category:${category}`);
    };

    return (
        <div>
            <form className="p-4 sm" onSubmit={handleSubmit}>
                <input
                    required
                    className="p-2 my-2 rounded w-96 text-black"
                    type="text"
                    placeholder="Item name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} // This binds input to state
                />
                <div className="flex items-center">
                    <div className="p-1 bg-white text-white w-36 flex justify-between content-center rounded">
                        <div className="flex">
                            <button
                                type="button"
                                className={`${
                                    quantity === 1
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-transparent hover:bg-blue-500 border border-blue-500 text-blue-700'
                                } font-semibold hover:text-white py-1 px-2 hover:border-transparent rounded`}
                                disabled={quantity === 1}
                                onClick={decrement}
                            >
                                -
                            </button>
                        </div>
                        <div className="self-center">
                            <p className="text-black">{quantity}</p>
                        </div>
                        <div className="flex">
                            <button
                                type="button"
                                className={`${
                                    quantity === 20
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-transparent hover:bg-blue-500 border border-blue-500 text-blue-700'
                                } font-semibold hover:text-white py-1 px-2 hover:border-transparent rounded`}
                                disabled={quantity === 20}
                                onClick={increment}
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <label
                        htmlFor="categories"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Select an option
                    </label>
                    <select
                        id="categories"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={category} // Bind select to category state
                        onChange={(e) => setCategory(e.target.value)} // Update category on change
                    >
                        <option value="produce">Produce</option>
                        <option value="dairy">Dairy</option>
                        <option value="bakery">Bakery</option>
                        <option value="meat">Meat</option>
                        <option value="frozen goods">Frozen Goods</option>
                        <option value="canned goods">Canned Goods</option>
                        <option value="dry goods">Dry Goods</option>
                        <option value="beverages">Beverages</option>
                        <option value="snacks">Snacks</option>
                        <option value="household">Household</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <input
                    type="submit"
                    value="+"
                    className="rounded bg-blue-500 text-white px-4 py-2 w-96 my-3"
                />
            </form>
        </div>
    );
}
