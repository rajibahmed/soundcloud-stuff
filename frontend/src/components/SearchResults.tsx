import React from "react";
import SearchItem from "./SearchItem";
import { Track } from "../typings/App";

const EmptyTracks = () => {
  return <h4>No tracks found</h4>;
};

export default ({
  tracks,
  playSong,
}: {
  tracks: Track[] | null;
  playSong: Function;
}) => {
  return tracks ? (
    <div className="column column-50">
      <ul className="SearchResults">
        {tracks.map((track: any, idx: number) => (
          <SearchItem key={idx} track={track} playSong={playSong} />
        ))}
      </ul>
    </div>
  ) : (
    <EmptyTracks />
  );
};
