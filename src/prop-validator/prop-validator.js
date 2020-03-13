import PropTypes from 'prop-types';
import {GameType} from '../const.js';

const PropValidator = {
  ERRORS_COUNT: PropTypes.number.isRequired,
  ON_WELCOME_BUTTON_CLICK: PropTypes.func.isRequired,
  QUESTIONS: PropTypes.array.isRequired,
  ON_ANSWER: PropTypes.func.isRequired,
  GENRE_QUESTION: PropTypes.exact({
    answers: PropTypes.arrayOf(PropTypes.exact({
      src: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
    })).isRequired,
    genre: PropTypes.string.isRequired,
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
  }).isRequired,
  ARTIST_QUESTION: PropTypes.exact({
    answers: PropTypes.arrayOf(PropTypes.exact({
      artist: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
    })).isRequired,
    song: PropTypes.exact({
      artist: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    }).isRequired,
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
  }).isRequired,
  QUESTION_TYPE: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
  NODES: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  IS_PLAYING: PropTypes.bool.isRequired,
  SRC: PropTypes.string.isRequired,
  ON_PLAY_BUTTON_CLICK: PropTypes.func.isRequired,
  RENDER_PLAYER: PropTypes.func.isRequired,
  ON_USER_ANSWER: PropTypes.func.isRequired,
  STEP: PropTypes.number.isRequired,
  COUNT: PropTypes.number.isRequired,
  MISTAKES: PropTypes.number.isRequired,
  IS_LOADING: PropTypes.bool.isRequired,
  ON_CHANGE: PropTypes.func.isRequired,
  GENRE_ANSWERS: PropTypes.arrayOf(PropTypes.bool).isRequired,
  GENRE_GIVEN_ANSWER: PropTypes.exact({
    src: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  }).isRequired,
  GENRE_ANSWER_ID: PropTypes.number.isRequired,
  GENRE_USER_ANSWER: PropTypes.bool.isRequired,
  ON_REPLAY_BUTON_CLICK: PropTypes.func.isRequired,
  RESET_GAME: PropTypes.func.isRequired
};

export {PropValidator};
