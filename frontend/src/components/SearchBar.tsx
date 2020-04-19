import React from "react";

export default ({ setQuery }: { setQuery: Function }) => (
  <form>
    <input
      type="text"
      name="song"
      onChange={(e) => e.target.value && setQuery(e.target.value)}
    />
  </form>
);
