import React from "react";

function millisToMinutesAndSeconds(millis: number) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);

  return minutes + ":" + (Number(seconds) < 10 ? "0" + seconds : seconds);
}

export default ({ track, playSong }: any) => {
  return (
    <li key={track.id} className="SearchItem">
      <div className="title">{track.title}</div>
      <div className="artist">{track.user.username}</div>
      <div className="duration">
        {millisToMinutesAndSeconds(track.duration)}
      </div>
      <div className="playButton">
        <button
          className="button button-outline"
          onClick={() => playSong(track)}
        >
          Play
        </button>
      </div>
    </li>
  );
};
