import express, { Request, Response, NextFunction } from "express";
import pool from "../db";
import jwt from "jsonwebtoken";

const router = express.Router();

// Define an interface to extend Express Request with user data
interface AuthenticatedRequest extends Request {
  user?: { userId: number }; // Ensure userId is explicitly typed
}

// Middleware to verify JWT Token
const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Access denied" });
    return;
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

// Save a new recipe
router.post("/", authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { title, ingredients, instructions } = req.body;

  if (!req.user) {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }

  const userId = req.user.userId;

  try {
    // Ensure ingredients are stored as an array
    const formattedIngredients = Array.isArray(ingredients)
      ? ingredients
      : ingredients.split("\n").map((ing: string) => ing.trim());

    const result = await pool.query(
      "INSERT INTO recipes (user_id, title, ingredients, instructions) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, title, formattedIngredients, instructions]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error saving recipe:", err);
    res.status(500).json({ error: "Error saving recipe" });
  }
});

// Retrieve saved recipes for logged-in user
router.get("/", authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }

  const userId = req.user.userId;

  try {
    const result = await pool.query(
      "SELECT id, title, ingredients::text[], instructions FROM recipes WHERE user_id = $1",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching recipes:", err);
    res.status(500).json({ error: "Error fetching recipes" });
  }
});

// Update a recipe
router.put("/:id", authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, ingredients, instructions } = req.body;
  const userId = req.user?.userId;

  try {
    const formattedIngredients = Array.isArray(ingredients) ? ingredients : ingredients.split("\n").map((ing: string) => ing.trim());

    const result = await pool.query(
      "UPDATE recipes SET title = $1, ingredients = $2, instructions = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
      [title, formattedIngredients, instructions, id, userId]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ error: "Recipe not found or unauthorized" });
      return;
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating recipe:", err);
    res.status(500).json({ error: "Error updating recipe" });
  }
});

// Delete a recipe
router.delete("/:id", authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = req.user?.userId;

  try {
    const result = await pool.query("DELETE FROM recipes WHERE id = $1 AND user_id = $2 RETURNING *", [id, userId]);

    if (result.rowCount === 0) {
      res.status(404).json({ error: "Recipe not found or unauthorized" });
      return;
    }

    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    console.error("Error deleting recipe:", err);
    res.status(500).json({ error: "Error deleting recipe" });
  }
});


export default router;
