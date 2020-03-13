import React, {PureComponent} from 'react';
import {PropValidator} from '../../prop-validator/prop-validator.js';

class AudioPlayer extends PureComponent {
  render() {
    const {isLoading, isPlaying, onPlayButtonClick, children} = this.props;

    return (
      <React.Fragment>
        <button
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          type="button"
          disabled={isLoading}
          onClick={() => {
            onPlayButtonClick();
          }}
        />
        <div className="track__status">
          {children}
        </div>
      </React.Fragment>
    );
  }
}

AudioPlayer.propTypes = {
  isLoading: PropValidator.IS_LOADING,
  isPlaying: PropValidator.IS_PLAYING,
  onPlayButtonClick: PropValidator.ON_PLAY_BUTTON_CLICK,
  children: PropValidator.NODES
};

export default AudioPlayer;
