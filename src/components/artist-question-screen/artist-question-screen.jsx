import React from 'react';
import {PropValidator} from '../../prop-validator/prop-validator.js';

const ArtistQuestionScreen = (props) => {
  const {onAnswer, question, renderPlayer, step} = props;
  const {
    answers,
    song,
  } = question;

  return (
    <section className="game__screen">
      <h2 className="game__title">Кто исполняет эту песню?</h2>
      <div className="game__track">
        <div className="track" key={song.src + step}>
          {renderPlayer(song.src, 0)}
        </div>
      </div>

      <form className="game__artist">
        {answers.map((answer, i) => (
          <div key={answer.artist + Math.random()} className="artist">
            <input className="artist__input visually-hidden" type="radio" name="answer" value={`answer-${i}`} id={`answer-${i}`}
              onChange={(evt) => {
                evt.preventDefault();
                onAnswer(question, answer);
              }}
            />
            <label className="artist__name" htmlFor={`answer-${i}`}>
              <img className="artist__picture" src={answer.picture} alt={answer.artist} />
              {answer.artist}
            </label>
          </div>
        ))}
      </form>
    </section>
  );
};

ArtistQuestionScreen.propTypes = {
  onAnswer: PropValidator.ON_ANSWER,
  question: PropValidator.ARTIST_QUESTION,
  renderPlayer: PropValidator.RENDER_PLAYER,
  step: PropValidator.STEP
};

export default ArtistQuestionScreen;
