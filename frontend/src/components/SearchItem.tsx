import React from "react";

function millisToMinutesAndSeconds(millis: number) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);

  return minutes + ":" + (Number(seconds) < 10 ? "0" + seconds : seconds);
}

export default ({ track, playSong }: any) => {
  return (
    <li key={track.id}>
      {track.title} - {track.user.username} -{" "}
      {millisToMinutesAndSeconds(track.duration)}
      <button className="button button-outline" onClick={() => playSong(track)}>
        Play
      </button>
    </li>
  );
};
