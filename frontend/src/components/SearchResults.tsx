import React from "react";
import SearchItem from "./SearchItem";
import { Track } from "../typings/App";

const EmptyTracks = () => {
  return <h4>No tracks found</h4>;
};

type SearchResultsProps = {
  tracks: Track[] | null;
  playSong: Function;
  playing: boolean;
  payingTrack?: number;
};

const SearchResults: React.FC<SearchResultsProps> = ({
  tracks,
  playSong,
  playing,
  payingTrack,
}) => {
  return tracks ? (
    <div className="column column-50">
      <ul className="SearchResults">
        {tracks.map((track: Track, idx: number) => (
          <SearchItem
            key={idx}
            track={track}
            playing={playing}
            playSong={playSong}
            playingTrack={payingTrack}
          />
        ))}
      </ul>
    </div>
  ) : (
    <EmptyTracks />
  );
};

export default SearchResults;
