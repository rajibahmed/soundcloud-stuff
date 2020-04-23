import React from "react";
import { Track } from "../typings/App";

type PlayerProps = {
  track: Track;
};

const Player: React.FC<PlayerProps> = ({ track }) => {
  return (
    <span className="column column-50">
      <h1>{track.id}</h1>
    </span>
  );
};

export default Player;
