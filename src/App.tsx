import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useRef,
} from "react";
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
    case actions.PAUSE:
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
  const playerHandle = useRef(null) as any;
  const onPauseSong = useCallback(() => {
    dispatch({ type: actions.PAUSE });
    playerHandle.current.pause();
  }, [playerHandle]);

  useEffect(() => {
    query && window.SC.get("/tracks", { q: query }).then(setTracks);
  }, [query]);

  useEffect(() => {
    state.track &&
      window.SC.stream(`/tracks/${state.track.id}`).then(function (player) {
        playerHandle.current = player;
        player.play();
      });
  }, [playerHandle, state.track]);

  return (
    <div className="container Body">
      <Logo />
      <SearchBar setQuery={setQuery} />
      <SearchResults
        playSong={onPlaySong}
        pauseSong={onPauseSong}
        tracks={tracks}
        payingTrack={state?.track?.id}
      />
    </div>
  );
};

declare global {
  interface Window {
    SC: {
      get: (path: string, options?: {}) => Promise<Array<Track>>;
      stream: (trackUri: string) => Promise<any>;
    };
  }
}

export default App;
