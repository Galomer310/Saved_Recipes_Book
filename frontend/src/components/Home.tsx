import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Your Digital Saved Recipes Book</h1>
      <p>Sign up or log in to start adding and saving your favorite recipes!</p>
      <Link to="/register">
        <button>Register</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default Home;
