import React from "react";

export default ({ setQuery }: { setQuery: Function }) => (
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
