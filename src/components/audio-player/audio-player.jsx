import React, {PureComponent} from 'react';
import {PropValidator} from '../../prop-validator/prop-validator.js';

class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._audioRef = React.createRef();

    this.state = {
      progress: 0,
      isLoading: true,
      isPlaying: props.isPlaying
    };
  }

  componentDidMount() {
    const {src} = this.props;
    const audio = this._audioRef.current;

    audio.src = src;

    audio.oncanplaythrough = () => this.setState({
      isLoading: false
    });

    audio.onplay = () => {
      this.setState({
        isPlaying: true
      });
    };

    audio.onpause = () => this.setState({
      isPlaying: false
    });

    audio.ontimeupdate = () => this.setState({
      progress: audio.currentTime
    });
  }

  componentWillUnmount() {
    const audio = this._audioRef.current;

    audio.oncanplaythrough = null;
    audio.onplay = null;
    audio.onpause = null;
    audio.ontimeupdate = null;
    audio.src = ``;
  }

  render() {
    const {isLoading, isPlaying} = this.state;
    const {onPlayButtonClick} = this.props;

    return (
      <React.Fragment>
        <button
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          type="button"
          disabled={isLoading}
          onClick={() => {
            this.setState({isPlaying: !this.state.isPlaying});
            onPlayButtonClick();
          }}
        />
        <div className="track__status">
          <audio
            ref={this._audioRef}
          />
        </div>
      </React.Fragment>
    );
  }

  componentDidUpdate() {
    const audio = this._audioRef.current;

    if (this.props.isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }
}

AudioPlayer.propTypes = {
  isPlaying: PropValidator.IS_PLAYING,
  onPlayButtonClick: PropValidator.ON_PLAY_BUTTON_CLICK,
  src: PropValidator.SRC
};

export default AudioPlayer;
