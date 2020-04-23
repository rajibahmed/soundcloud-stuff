import React, { useEffect, useRef, useState } from "react";
import { Track } from "../typings/App";

type PlayerProps = {
  track: Track;
};

const Player: React.FC<PlayerProps> = ({ track }) => {
  const [playing, setPlaying] = useState(true);

  const playerHandle = useRef(null) as any;
  const pause = () => {
    setPlaying(false);
    playerHandle.current.pause();
  };

  useEffect(() => {
    window.SC.stream(`/tracks/${track.id}`).then(function (player) {
      playerHandle.current = player;
      player.play();
    });
  }, [playerHandle, track.id]);

  return (
    <span className="column column-50">
      <button onClick={pause}>Pause</button>
      {playing ? (
        <div className="Loding_ripple">
          <div></div>
          <div></div>
        </div>
      ) : null}
    </span>
  );
};

export default Player;
