import React, { useEffect } from "react";

export default ({ track }: any) => {
  useEffect(() => {
    window.SC.oEmbed(track.permalink_url, { auto_play: true }).then(function (
      oEmbed
    ) {
      console.log("oEmbed response: ", oEmbed);
    });
  }, [track.permalink_url]);
  return (
    <>
      <h1>{track.id}</h1>
      <img src={track.thumbnail_url} alt="Album cover" />
    </>
  );
};
