const API_BASE = "http://localhost:3000";

export const registerUser = async (data: object) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const loginUser = async (data: object) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

interface Recipe {
  ingredients: string | string[];
  [key: string]: any;
}

export const saveRecipe = async (recipe: Recipe, token: string) => {
  const formattedRecipe = {
    ...recipe,
    ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : recipe.ingredients.split("\n").map((ing) => ing.trim()),
  };

  const res = await fetch(`${API_BASE}/recipes`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(formattedRecipe),
  });

  return res.json();
};

export const getRecipes = async (token: string) => {
  const res = await fetch(`${API_BASE}/recipes`, {
    headers: { "Authorization": `Bearer ${token}` },
  });

  return res.json();
};

export const updateRecipe = async (recipeId: string, updatedRecipe: object, token: string) => {
  const res = await fetch(`${API_BASE}/recipes/${recipeId}`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(updatedRecipe),
  });

  return res.json();
};

export const deleteRecipe = async (recipeId: string, token: string) => {
  const res = await fetch(`${API_BASE}/recipes/${recipeId}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` },
  });

  return res.json();
};