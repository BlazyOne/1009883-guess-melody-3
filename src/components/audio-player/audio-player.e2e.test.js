import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AudioPlayer from './audio-player.jsx';

configure({adapter: new Adapter()});

jest.spyOn(window.HTMLMediaElement.prototype, `play`)
  .mockImplementation(() => {});

jest.spyOn(window.HTMLMediaElement.prototype, `load`)
  .mockImplementation(() => {});

it(`Should play button be pressed`, () => {
  const onPlayButtonClick = jest.fn();

  const audioPlayer = mount(
      <AudioPlayer
        isPlaying={true}
        isLoading={false}
        onPlayButtonClick={onPlayButtonClick}
        src={``}
      >
        <audio/>
      </AudioPlayer>
  );

  const playButton = audioPlayer.find(`button.track__button`);

  playButton.simulate(`click`);

  expect(onPlayButtonClick).toHaveBeenCalledTimes(1);
});
