import { useState, useEffect } from "react";

import "./App.css";
import { cats } from "./utils/cats";

function App() {
  const [catsWithImage, setCatsWithImageUrl] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCatsWithImage = async () => {
    try {
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search?limit=10"
      );
      const catsImage = await response.json();

      return cats.map((cat, index) => ({
        ...cat,
        imageUrl: catsImage[index]?.url || "/images/default.jpg",
      }));
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const catsWithImage = await fetchCatsWithImage();
      setCatsWithImageUrl(catsWithImage);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="App">
      <h1>Cats</h1>

      <ul>
        {catsWithImage.map((cat, index) => (
          <li key={index}>
            <h2>{cat.name}</h2>
            <p>Age: {cat.age}</p>
            <p>Years: {cat.years}</p>
            <p>Trait: {cat.trait}</p>
            <img src={cat.imageUrl} alt={cat.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
