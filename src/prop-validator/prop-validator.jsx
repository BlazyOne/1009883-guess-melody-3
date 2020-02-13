import PropTypes from 'prop-types';
import {GameType} from '../const.js';

const PropValidator = {
  ERRORS_COUNT: PropTypes.number.isRequired,
  ON_WELCOME_BUTTON_CLICK: PropTypes.func.isRequired,
  QUESTIONS: PropTypes.array.isRequired,
  ON_ANSWER: PropTypes.func.isRequired,
  GENRE_QUESTION: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
    })).isRequired,
    genre: PropTypes.string.isRequired,
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
  }).isRequired,
  ARTIST_QUESTION: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      artist: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
    })).isRequired,
    song: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    }).isRequired,
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
  }).isRequired
};

export {PropValidator};
