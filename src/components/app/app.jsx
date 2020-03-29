import React, {PureComponent} from 'react';
import {Switch, Route, Router} from 'react-router-dom';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/game/game.js';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import AuthScreen from '../auth-screen/auth-screen.jsx';
import GameScreen from '../game-screen/game-screen.jsx';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen.jsx';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen.jsx';
import GameOverScreen from '../game-over-screen/game-over-screen.jsx';
import WinScreen from '../win-screen/win-screen.jsx';
import PrivateRoute from '../private-root/private-root.jsx';
import {PropValidator} from '../../prop-validator/prop-validator.js';
import {GameType} from '../../const.js';
import withActivePlayer from '../../hocs/with-active-player/with-active-player.jsx';
import withUserAnswer from '../../hocs/with-user-answer/with-user-answer.jsx';
import {getStep, getMistakes, getMaxMistakes} from '../../reducer/game/selectors.js';
import {getQuestions} from '../../reducer/data/selectors.js';
import {getAuthorizationStatus} from '../../reducer/user/selectors.js';
import {Operation as UserOperation} from '../../reducer/user/user.js';
import history from '../../history.js';
import {AppRoute} from '../../const.js';

const GenreQuestionScreenWrapped = withActivePlayer(withUserAnswer(GenreQuestionScreen));
const ArtistQuestionScreenWrapped = withActivePlayer(ArtistQuestionScreen);

class App extends PureComponent {
  _renderGameScreen() {
    const {
      authorizationStatus,
      maxMistakes,
      mistakes,
      questions,
      onUserAnswer,
      onWelcomeButtonClick,
      step
    } = this.props;
    const question = questions[step];

    if (step === -1) {
      return (
        <WelcomeScreen
          errorsCount={maxMistakes}
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
      );
    }

    if (mistakes >= maxMistakes) {
      history.push(AppRoute.LOSE);
    }

    if (step >= questions.length) {
      if (authorizationStatus === AuthorizationStatus.AUTH) {
        history.push(AppRoute.RESULT);
      } else if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
        history.push(AppRoute.LOGIN);
      }

      return null;
    }

    if (question) {
      switch (question.type) {
        case GameType.ARTIST:
          return (
            <GameScreen
              type={question.type}
              mistakes={mistakes}
            >
              <ArtistQuestionScreenWrapped
                question={question}
                onAnswer={onUserAnswer}
                step={step}
              />
            </GameScreen>
          );
        case GameType.GENRE:
          return (
            <GameScreen
              type={question.type}
              mistakes={mistakes}
            >
              <GenreQuestionScreenWrapped
                question={question}
                onAnswer={onUserAnswer}
              />
            </GameScreen>
          );
      }
    }

    return null;
  }

  render() {
    const {questions, mistakes, resetGame, login} = this.props;

    return (
      <Router
        history={history}
      >
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            {this._renderGameScreen()}
          </Route>
          <Route exact path={AppRoute.LOGIN}>
            <AuthScreen
              onReplayButtonClick={resetGame}
              onSubmit={login}
            />
          </Route>
          <Route exact path={AppRoute.LOSE}>
            <GameOverScreen
              onReplayButtonClick={resetGame}
            />
          </Route>
          <PrivateRoute
            exact
            path={AppRoute.RESULT}
            render={() => {
              return (
                <WinScreen
                  questionsCount={questions.length}
                  mistakesCount={mistakes}
                  onReplayButtonClick={resetGame}
                />
              );
            }}
          />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  authorizationStatus: PropValidator.AUTHORIZATION_STATUS,
  login: PropValidator.LOGIN,
  maxMistakes: PropValidator.ERRORS_COUNT,
  mistakes: PropValidator.COUNT,
  questions: PropValidator.QUESTIONS,
  onUserAnswer: PropValidator.ON_USER_ANSWER,
  onWelcomeButtonClick: PropValidator.ON_WELCOME_BUTTON_CLICK,
  resetGame: PropValidator.RESET_GAME,
  step: PropValidator.STEP
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  step: getStep(state),
  maxMistakes: getMaxMistakes(state),
  questions: getQuestions(state),
  mistakes: getMistakes(state)
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  onWelcomeButtonClick() {
    dispatch(ActionCreator.incrementStep());
  },
  onUserAnswer(question, answer) {
    dispatch(ActionCreator.incrementMistake(question, answer));
    dispatch(ActionCreator.incrementStep());
  },
  resetGame() {
    dispatch(ActionCreator.resetGame());
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
