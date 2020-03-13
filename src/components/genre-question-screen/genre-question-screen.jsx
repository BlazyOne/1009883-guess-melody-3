import React, {PureComponent} from 'react';
import {PropValidator} from '../../prop-validator/prop-validator.js';
import GenreQuestionItem from "../genre-question-item/genre-question-item.jsx";

class GenreQuestionScreen extends PureComponent {
  render() {
    const {
      onAnswer,
      onChange,
      question,
      renderPlayer,
      userAnswers,
    } = this.props;
    const {
      answers,
      genre
    } = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          className="game__tracks"
          onSubmit={(evt) => {
            evt.preventDefault();
            onAnswer();
          }}
        >
          {answers.map((answer, i) => (
            <GenreQuestionItem
              answer={answer}
              id={i}
              key={`${i}-${answer.src}`}
              onChange={onChange}
              renderPlayer={renderPlayer}
              userAnswer={userAnswers[i]}
            />
          ))}

          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    );
  }
}

GenreQuestionScreen.propTypes = {
  onAnswer: PropValidator.ON_ANSWER,
  onChange: PropValidator.ON_CHANGE,
  question: PropValidator.GENRE_QUESTION,
  renderPlayer: PropValidator.RENDER_PLAYER,
  userAnswers: PropValidator.GENRE_ANSWERS
};

export default GenreQuestionScreen;
