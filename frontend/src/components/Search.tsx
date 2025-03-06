import React, { useState } from "react";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Searching for recipes with: ${query}`);
  };

  return (
    <div className="search-container">
      <h2>Search for Recipes</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter ingredients or dish name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;
