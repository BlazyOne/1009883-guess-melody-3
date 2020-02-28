import React from "react";
import {PropValidator} from '../../prop-validator/prop-validator.js';


const Mistakes = (props) => {
  const {count} = props;

  const mistakes = new Array(count).fill(``);

  return (
    <div className="game__mistakes">
      {mistakes.map((it, i) => <div key={`mistake-${i}`} className="wrong" />)}
    </div>
  );
};

Mistakes.propTypes = {
  count: PropValidator.COUNT,
};

export default Mistakes;
