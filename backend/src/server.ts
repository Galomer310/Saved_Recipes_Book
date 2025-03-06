import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import recipeRoutes from "./routes/recipeRoutes";

dotenv.config();

const app = express();

// ✅ Allow CORS for frontend on Render
app.use(cors({
  origin: "https://saved-recipes-book-1.onrender.com", // Change to your frontend URL
  credentials: true,
}));

app.use(express.json());

app.use("/auth", userRoutes);
app.use("/recipes", recipeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
