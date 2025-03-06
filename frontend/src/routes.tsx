import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import NewRecipeForm from "./components/NewRecipeForm";
import SavedRecipes from "./components/SavedRecipes";

const AppRoutes = () => {
  return (
    <Router>
      <Navbar /> {/* Add Navbar here so it appears on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-recipe" element={<NewRecipeForm />} />
        <Route path="/saved-recipes" element={<SavedRecipes />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
