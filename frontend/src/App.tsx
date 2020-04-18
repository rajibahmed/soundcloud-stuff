import React, { useState, useEffect } from "react";
import "./App.css";

declare global {
  interface Window {
    SC: {
      get: (path: string, options?: {}) => Promise<any>;
    };
  }
}

const App = () => {
  const [song, setSong] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    window.SC.get("/tracks", { q: song }).then((songsResponse) =>
      setResults(songsResponse)
    );
  }, [song]);

  return (
    <div className="amz-app">
      <h1>this is a app</h1>
      <input
        name="song"
        onChange={(e) => e.target.value && setSong(e.target.value)}
      />
      {song && <h3>{song}</h3>}
      {results &&
        results.map((r: { created_at: string }) => <p>{r.created_at}</p>)}
    </div>
  );
};

export default App;
