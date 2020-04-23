import React from "react";

export default ({ track }: any) => {
  return (
    <span className="column column-50">
      <h1>{track.id}</h1>
      <img src={track.thumbnail_url} alt="Album cover" />
    </span>
  );
};
