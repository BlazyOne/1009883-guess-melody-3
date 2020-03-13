import React, {PureComponent} from 'react';
import {PropValidator} from '../../prop-validator/prop-validator.js';

class GenreQuestionItem extends PureComponent {
  render() {
    const {answer, id, onChange, renderPlayer, userAnswer} = this.props;

    return (
      <div className="track">
        {renderPlayer(answer.src, id)}
        <div className="game__answer">
          <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${id}`}
            id={`answer-${id}`}
            checked={userAnswer}
            onChange={(evt) => {
              const value = evt.target.checked;

              onChange(id, value);
            }}
          />
          <label className="game__check" htmlFor={`answer-${id}`}>Отметить</label>
        </div>
      </div>
    );
  }
}

GenreQuestionItem.propTypes = {
  answer: PropValidator.GENRE_GIVEN_ANSWER,
  id: PropValidator.GENRE_ANSWER_ID,
  onChange: PropValidator.ON_CHANGE,
  renderPlayer: PropValidator.RENDER_PLAYER,
  userAnswer: PropValidator.GENRE_USER_ANSWER
};

export default GenreQuestionItem;
