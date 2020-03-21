import React from 'react';
import {PropValidator} from '../../prop-validator/prop-validator.js';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withAudio from './with-audio.jsx';

configure({adapter: new Adapter()});

const Player = (props) => {
  const {onPlayButtonClick, children} = props;
  return (
    <div>
      <button onClick={onPlayButtonClick} />
      {children}
    </div>
  );
};

Player.propTypes = {
  onPlayButtonClick: PropValidator.ON_PLAY_BUTTON_CLICK,
  children: PropValidator.NODES
};

it(`Checks that callback gets called on play button click`, () => {
  const onPlayButtonClick = jest.fn();
  const PlayerWrapped = withAudio(Player);
  const wrapper = mount(<PlayerWrapped
    isPlaying={false}
    onPlayButtonClick={onPlayButtonClick}
    src=""
  />);

  window.HTMLMediaElement.prototype.play = () => {};
  window.HTMLMediaElement.prototype.pause = () => {};

  const {_audioRef} = wrapper.instance();

  jest.spyOn(_audioRef.current, `play`);

  wrapper.instance().componentDidMount();

  wrapper.find(`button`).simulate(`click`);

  expect(onPlayButtonClick).toHaveBeenCalledTimes(1);
});
