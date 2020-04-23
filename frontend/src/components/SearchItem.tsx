import React, { useState } from "react";
import { Track } from "../typings/App";
import { CLIENT_RENEG_WINDOW } from "tls";

function millisToMinutesAndSeconds(millis: number) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);

  return minutes + ":" + (Number(seconds) < 10 ? "0" + seconds : seconds);
}

type SearchItemProps = {
  playing: boolean;
  track: Track;
  playSong: Function;
  playingTrack?: number;
};

const SearchItem: React.FC<SearchItemProps> = ({
  playing,
  track,
  playSong,
  playingTrack,
}) => {
  return (
    <li key={track.id} className="SearchItem">
      <div className="divider Avatar">
        <img src={track.user.avatar_url} alt="" />
      </div>
      <div className="divider TrackInfo">
        <span className="title">{track.title}</span>
        <span className="duration">
          {millisToMinutesAndSeconds(track.duration)}
        </span>
        <span className="info-divider">•</span>
        <span className="artist">{track.user.username}</span>
      </div>
      <div className="divider playButton">
        {playing && track.id === playingTrack ? (
          <button
            className="button button-outline"
            onClick={() => {
              console.log(1);
            }}
          >
            Pause
          </button>
        ) : (
          <button
            className="button button-outline"
            onClick={() => {
              playSong(track);
            }}
          >
            Play
          </button>
        )}
      </div>
    </li>
  );
};

export default SearchItem;
