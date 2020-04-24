import React from "react";
import { render } from "@testing-library/react";
import SearchItem, { millisToMinutesAndSeconds } from "./SearchItem";
test("Millisecond to minute", () => {
  expect(millisToMinutesAndSeconds(-1000)).toEqual("0:00");
  expect(millisToMinutesAndSeconds(0)).toEqual("0:00");
  expect(millisToMinutesAndSeconds(60000)).toEqual("1:00");
  expect(millisToMinutesAndSeconds(146000)).toEqual("2:26");
});

describe("SearchItem", () => {
  test("Default view", () => {
    const noop = () => {};
    const track: any = {
      user: { avatar_url: "", username: "rajib" },
      title: "nice song",
      id: 12121,
      duratioin: 100000,
    };
    const component = render(
      <SearchItem
        playingTrack={undefined}
        pauseSong={noop}
        playSong={noop}
        track={track}
      />
    );

    expect(component.asFragment()).toMatchSnapshot();
  });
});
