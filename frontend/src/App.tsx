import React, { useState, useEffect, useReducer } from "react";
import { Track } from "./typings/App";
import Logo from "./components/Logo";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import actions from "./actions";

import "./App.css";

interface PlayerState {
  play: boolean;
  track: Track | undefined;
}
const playerState: PlayerState = { play: false, track: undefined };

function playerReducer(
  state: any,
  { type, track }: { type: string; track?: Track }
) {
  switch (type) {
    case actions.PLAY:
      return { play: true, track };
    case actions.STOP:
      return { play: false };
    default:
      throw new Error();
  }
}

const App = () => {
  const [query, setQuery] = useState<string | undefined>();
  const [tracks, setTracks] = useState<Array<Track> | null>(null);
  const [state, dispatch] = useReducer(playerReducer, playerState);

  useEffect(() => {
    query && window.SC.get("/tracks", { q: query }).then(setTracks);
  }, [query]);

  return (
    <div className="container">
      <Logo />
      <div className="row">
        <div className="column column-50">
          <SearchBar setQuery={setQuery} />
          <SearchResults
            playSong={(track: Track) => dispatch({ type: actions.PLAY, track })}
            tracks={tracks}
          />
        </div>
        <div className="column column-50">
          {state.play && state.track && (
            <>
              <h1>{state.track.id}</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti, porro enim nemo corporis eum quisquam quos repellat
                adipisci ut? Iure harum nostrum tempore minus corrupti similique
                beatae, minima provident nobis?
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

declare global {
  interface Window {
    SC: {
      get: (path: string, options?: {}) => Promise<Array<Track>>;
    };
  }
}

export default App;
