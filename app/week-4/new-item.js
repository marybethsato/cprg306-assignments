"use client";

import { useState } from "react";

export function NewItem() {
    const [quantity, setQuantity] = useState(1);

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

    return (
        <div className="p-2 m-4 bg-white text-white w-36 flex justify-between content-center rounded">
            <div className="flex">
                <button className= {`${  quantity===1 ? 'bg-gray-400 cursor-not-allowed' :  'bg-transparent hover:bg-blue-500 border border-blue-500 text-blue-700'} font-semibold hover:text-white py-2 px-4 hover:border-transparent rounded`} 
                 disabled={quantity === 1}
                onClick={decrement}>-</button>
            </div>
            <div className="self-center">
                <p className="text-black font-semibold">{quantity}</p>
            </div>
            <div className="flex">
                <button className={`${  quantity===20 ? 'bg-gray-400 cursor-not-allowed' :  'bg-transparent hover:bg-blue-500 border border-blue-500 text-blue-700'} font-semibold hover:text-white py-2 px-4 hover:border-transparent rounded`}  
                  disabled={quantity === 20}
                onClick={increment}>+</button>
            </div>
        </div>
    );
}