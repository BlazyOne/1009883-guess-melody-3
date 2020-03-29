import React from 'react';
import {PropValidator} from '../../prop-validator/prop-validator.js';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.js';

const WinScreen = (props) => {
  const {questionsCount, mistakesCount, onReplayButtonClick} = props;
  const correctlyQuestionsCount = questionsCount - mistakesCount;

  return (
    <section className="result">
      <div className="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">Вы ответили правильно на {correctlyQuestionsCount} вопросов и совершили {mistakesCount} ошибки</p>
      <Link
        className="replay"
        to={AppRoute.ROOT}
        onClick={onReplayButtonClick}
      >
        Сыграть ещё раз
      </Link>
    </section>
  );
};

WinScreen.propTypes = {
  questionsCount: PropValidator.COUNT,
  mistakesCount: PropValidator.COUNT,
  onReplayButtonClick: PropValidator.ON_REPLAY_BUTON_CLICK
};

export default WinScreen;
