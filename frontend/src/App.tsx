import React, { useState, useEffect } from "react";
import { Track } from "./typings/App";

import "./App.css";

const App = () => {
  const [query, setQuery] = useState<string | undefined>();
  const [tracks, setTracks] = useState<Array<Track> | null>(null);

  useEffect(() => {
    query && window.SC.get("/tracks", { q: query }).then(setTracks);
  }, [query]);

  return (
    <div className="amz-app">
      <h1>this is a app</h1>
      <input
        name="song"
        onChange={(e) => e.target.value && setQuery(e.target.value)}
        onFocusCapture={console.log}
      />
      {query && <h3>Searching for - {query}</h3>}
      {tracks && tracks.map((t) => <p key={t.id}>{t.title}</p>)}
    </div>
  );
};

declare global {
  interface Window {
    SC: {
      get: (path: string, options?: {}) => Promise<any>;
    };
  }
}

export default App;
