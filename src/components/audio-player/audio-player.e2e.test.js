import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AudioPlayer from './audio-player.jsx';

configure({adapter: new Adapter()});

it(`Should play button be pressed`, () => {
  const onPlayButtonClick = jest.fn();

  const audioPlayer = shallow(
      <AudioPlayer
        isPlaying={true}
        onPlayButtonClick={onPlayButtonClick}
        src={``}
      />
  );

  const playButton = audioPlayer.find(`button.track__button`);

  playButton.simulate(`click`);

  expect(onPlayButtonClick).toHaveBeenCalledTimes(1);
});
