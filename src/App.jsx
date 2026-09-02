import { useState } from "react";

function App() {
  const [recipeName, setRecipeName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [error, setError] = useState("");

  const findRecipe = async () => {
    if (!recipeName.trim()) {
      setError("Please enter a recipe name.");
      return;
    }

    setLoading(true);
    setError("");
    setInstructions("");

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
          recipeName
        )}`
      );

      const data = await response.json();

      if (!data.meals) {
        setError("Recipe not found.");
        return;
      }

      setInstructions(data.meals[0].strInstructions);
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Recipe Finder</h1>

      <input
        type="text"
        placeholder="Enter recipe name"
        value={recipeName}
        onChange={(e) => setRecipeName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            findRecipe();
          }
        }}
      />

      <button onClick={findRecipe}>
        Find Recipe
      </button>
      {error && <p>{error}</p>}

      {instructions && (
        <div>
          <h2>Instructions</h2>
          <p style={{ whiteSpace: "pre-line" }}>
            {instructions}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
