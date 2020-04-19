import React, { useState, useEffect, useReducer } from "react";
import { Track } from "./typings/App";

import "./App.css";

interface PlayerState {
  play: boolean;
  track: Track | undefined;
}
const playerState: PlayerState = { play: false, track: undefined };

const actions = {
  PLAY: "PLAY",
  PAUSE: "PAUSE",
  STOP: "STOP",
};

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

function millisToMinutesAndSeconds(millis: number) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);

  return minutes + ":" + (Number(seconds) < 10 ? "0" + seconds : seconds);
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
      <div className="row">
        <div className="column">
          <div className="Header">
            <h1>The App</h1>
            <h4>
              built with{" "}
              <span role="img" aria-label="love" style={{ color: "red" }}>
                ♥️
              </span>
            </h4>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="column column-50">
          <form>
            <input
              type="text"
              name="song"
              onChange={(e) => e.target.value && setQuery(e.target.value)}
              onFocusCapture={console.log}
            />
          </form>
          {query && <h3>Searching for - {query}</h3>}
          {tracks && (
            <ul>
              {tracks.map((t, idx) => (
                <li key={t.id} tabIndex={idx}>
                  {t.title} - {t.user.username} -{" "}
                  {millisToMinutesAndSeconds(t.duration)}
                  <button
                    className="button button-outline"
                    onClick={() => {
                      dispatch({ type: actions.PLAY, track: t });
                    }}
                  >
                    play
                  </button>
                </li>
              ))}
            </ul>
          )}
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
