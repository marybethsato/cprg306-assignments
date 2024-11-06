"use client";

import { useEffect, useState } from "react";

export function MealIdeas({ ingredient }) {
    const [meals, setMeals] = useState([]);
    const [mealIngredients, setMealIngredients] = useState([]);
    const [selectedMealIdeaId, setSelectedMealIdeaId] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Loading state for fetches

    async function fetchMealIdeas(ingredient) {
        try {
            setIsLoading(true); // Start loading
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`, {
                method: "GET",
            });
            const data = await response.json();
            return data.meals || [];
        } catch (error) {
            console.error("Error:", error);
            return []; // Return empty array on error
        } finally {
            setIsLoading(false); // Stop loading
        }
    }

    async function fetchMealDetails(id) {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`, {
                method: "GET",
            });
            const data = await response.json();
            return data.meals[0] ?? null;
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async function loadMealIdeas() {
        if (ingredient === "") return; // Do nothing if ingredient is empty
        const fetchedMeals = await fetchMealIdeas(ingredient);
        setMeals(fetchedMeals);
    }

    async function loadMealIngredients() {
        if (!selectedMealIdeaId) return; // Do nothing if no meal is selected
        const mealDetails = await fetchMealDetails(selectedMealIdeaId);
        setMealIngredients(mealDetails);
    }

    useEffect(() => {
        setSelectedMealIdeaId("");
        setMealIngredients([]);
        loadMealIdeas();
    }, [ingredient]);

    useEffect(() => {
        loadMealIngredients();
    }, [selectedMealIdeaId]);

    return (
        <div>
            <h4>Meal Ideas</h4>
            {ingredient === "" ? (
                <p>Select an ingredient to see meal ideas</p>
            ) : isLoading ? (
                <p>Loading...</p>
            ) : Array.isArray(meals) && meals.length > 0 ? (
                <div>
                    <p>Here are some meal ideas using {ingredient}:</p>
                    <ul>
                        {meals.map((meal) => (
                            <li key={meal.idMeal} onClick={() => setSelectedMealIdeaId(meal.idMeal)}>
                                <div className="p-2 m-2 bg-slate-900 hover:bg-orange-800 cursor-pointer w-96">
                                    <p className={selectedMealIdeaId === meal.idMeal ? "font-bold" : ""}>{meal.strMeal}</p>
                                    {selectedMealIdeaId === meal.idMeal && (
                                        mealIngredients && mealIngredients.idMeal === selectedMealIdeaId ? (
                                            <div className="m-2 extra-info">
                                                <p className="text-xs text-gray">Ingredients needed:</p>
                                                <ul className="list-disc list-inside">
                                                    {Object.entries(mealIngredients)
                                                        .filter(([key, value]) => key.startsWith("strIngredient") && value)
                                                        .map(([key, value], index) => (
                                                            <li className="text-xs text-gray ml-2" key={index}>{value}</li>
                                                        ))}
                                                </ul>
                                            </div>
                                        ) : (
                                            <p>Loading...</p>
                                        )
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No meal ideas found for {ingredient}</p>
            )}
        </div>
    );
}

export default MealIdeas;
