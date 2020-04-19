import React from "react";
import SearchItem from "./SearchItem";

const EmptyTracks = () => {
  return <h4>No tracks found</h4>;
};

export default ({ tracks, playSong }: any) => {
  return tracks ? (
    <ul>
      {tracks.map((track: any, idx: number) => (
        <SearchItem key={idx} track={track} playSong={playSong} />
      ))}
    </ul>
  ) : (
    <EmptyTracks />
  );
};
