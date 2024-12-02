import { useState, useEffect } from "react";

import "./App.css";
import { cats } from "./utils/cats";

function App() {
  const [catsImageUrl, setCatsImageUrl] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "https://api.thecatapi.com/v1/images/search?limit=10"
        );
        const data = await response.json();
        setCatsImageUrl(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="App">
      {console.log(catsImageUrl)}
      <h1>Cats</h1>
      <ul>
        {cats.map((cat, index) => (
          <li key={index}>
            <h2>{cat.name}</h2>
            <p>Age: {cat.age}</p>
            <p>Years: {cat.years}</p>
            <p>Trait: {cat.trait}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
