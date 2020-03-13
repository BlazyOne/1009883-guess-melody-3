import React from "react";
import renderer from "react-test-renderer";
import {PropValidator} from "../../prop-validator/prop-validator.js";
import withAudio from "./with-audio.jsx";

const MockComponent = (props) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  children: PropValidator.NODES
};

const MockComponentWrapped = withAudio(MockComponent);

it(`withAudio is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      isPlaying={false}
      onPlayButtonClick={() => {}}
      src={``}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
