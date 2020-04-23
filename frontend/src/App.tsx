import React, { useState, useEffect, useReducer, useCallback } from "react";
import { Track } from "./typings/App";
import Logo from "./components/Logo";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Player from "./components/Player";
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
  const onPlaySong = useCallback(
    (track: Track) => dispatch({ type: actions.PLAY, track }),
    []
  );

  useEffect(() => {
    query && window.SC.get("/tracks", { q: query }).then(setTracks);
  }, [query]);

  return (
    <span className="container">
      <Logo />
      <span className="row">
        <span className="column column-50">
          <SearchBar setQuery={setQuery} />
          <SearchResults playSong={onPlaySong} tracks={tracks} />
        </span>
        <span className="column column-50">
          {state.play && state.track && <Player track={state.track} />}
        </span>
      </span>
    </span>
  );
};

declare global {
  interface Window {
    SC: {
      get: (path: string, options?: {}) => Promise<Array<Track>>;
      oEmbed: (url: string, options?: {}) => Promise<any>;
    };
  }
}

export default App;
