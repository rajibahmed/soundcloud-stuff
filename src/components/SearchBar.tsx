import React from "react";

type SearchBarProps = {
  setQuery: Function;
};

const SearchBar: React.FC<SearchBarProps> = ({ setQuery }) => (
  <div className="SearchBarWrap">
    <form>
      <input
        type="text"
        name="song"
        onChange={(e) => e.target.value && setQuery(e.target.value)}
        className="SearchBar"
        placeholder="What is your favorite music?"
      />
    </form>
  </div>
);

export default SearchBar;
