import React, { useState, useEffect } from "react";
import { getRecipes, updateRecipe, deleteRecipe } from "../api";
import { Recipe } from "../types";

const SavedRecipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (token) {
      getRecipes(token)
        .then(setRecipes)
        .catch(() => setError("Failed to load saved recipes."));
    } else {
      setError("You must be logged in to view saved recipes.");
    }
  }, [token]);

  const handleUpdate = async (id: string, updatedRecipe: Recipe) => {
    if (!token) return;
    try {
      const updated = await updateRecipe(id, updatedRecipe, token);
      setRecipes(
        recipes.map((recipe) => (recipe.id === id ? updated : recipe))
      );
    } catch {
      alert("Error updating recipe");
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    try {
      await deleteRecipe(id, token);
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
    } catch {
      alert("Error deleting recipe");
    }
  };

  return (
    <div className="saved-recipes">
      <h2>Your Saved Recipes</h2>
      {error && <p className="error">{error}</p>}
      {recipes.length === 0 ? (
        <p>No saved recipes found.</p>
      ) : (
        recipes.map((recipe) => (
          <RecipeItem
            key={recipe.id}
            recipe={recipe}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

interface RecipeItemProps {
  recipe: Recipe;
  onUpdate: (id: string, updatedRecipe: Recipe) => void;
  onDelete: (id: string) => void;
}

const RecipeItem: React.FC<RecipeItemProps> = ({
  recipe,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState<Recipe>(recipe);

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdate(recipe.id, {
      ...editedRecipe,
      ingredients: editedRecipe.ingredients.map((ing) => ing.trim()), // Ensure ingredients remain as an array
    });
    setIsEditing(false);
  };

  return (
    <div className="recipe-card">
      {isEditing ? (
        <div>
          <input
            type="text"
            name="title"
            value={editedRecipe.title}
            onChange={handleEditChange}
          />
          <textarea
            name="ingredients"
            value={editedRecipe.ingredients.join("\n")}
            onChange={handleEditChange}
          />
          <textarea
            name="instructions"
            value={editedRecipe.instructions}
            onChange={handleEditChange}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{recipe.title}</h3>
          <p>
            <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
          </p>
          <p>
            <strong>Instructions:</strong> {recipe.instructions}
          </p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(recipe.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default SavedRecipes;
