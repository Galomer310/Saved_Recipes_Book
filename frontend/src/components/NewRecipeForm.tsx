import React, { useState } from "react";
import { Recipe } from "../types";
import { saveRecipe } from "../api";
import { useNavigate } from "react-router-dom";

const NewRecipeForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError("Please log in to save recipes.");
      return;
    }

    try {
      const newRecipe: Omit<Recipe, "id"> = {
        title,
        ingredients: ingredients.split("\n").map((ing) => ing.trim()),
        instructions,
      };

      await saveRecipe(newRecipe, token);

      // Clear form
      setTitle("");
      setIngredients("");
      setInstructions("");
      setError("");

      alert("Recipe saved successfully!");
    } catch (err) {
      setError("Error saving recipe. Please try again.");
    }
  };

  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Add a New Recipe</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Ingredients (one per line)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
          <textarea
            placeholder="Instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
          <button type="submit">Add Recipe</button>
        </form>
        {/* Button to navigate to saved recipes */}
        <button
          className="view-saved-btn"
          onClick={() => navigate("/saved-recipes")}
        >
          View Saved Recipes
        </button>
      </div>
    </div>
  );
};

export default NewRecipeForm;
