import React, {PureComponent} from 'react';
import {PropValidator} from '../../prop-validator/prop-validator.js';

const withUserAnswer = (Component) => {
  class WithUserAnswer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        answers: new Array(props.question.answers.length).fill(false),
      };

      this.handleAnswer = this.handleAnswer.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    handleAnswer() {
      const {onAnswer, question} = this.props;
      const {answers} = this.state;

      onAnswer(question, answers);
    }

    handleChange(i, value) {
      const {answers} = this.state;

      const userAnswers = answers.slice();
      userAnswers[i] = value;

      this.setState({
        answers: userAnswers,
      });
    }

    render() {
      const {answers} = this.state;

      return (
        <Component
          {...this.props}
          userAnswers={answers}
          onAnswer={this.handleAnswer}
          onChange={this.handleChange}
        />
      );
    }
  }

  WithUserAnswer.propTypes = {
    question: PropValidator.GENRE_QUESTION,
    onAnswer: PropValidator.ON_ANSWER
  };

  return WithUserAnswer;
};

export default withUserAnswer;
