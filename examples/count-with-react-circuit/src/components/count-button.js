import React, {PropTypes} from 'react';

export default function CountButton(props) {
  return (
    <div
      onClick={props.onCountButtonClick}
      >{props.children}</div>
  );
}

CountButton.propTypes = {
  children: PropTypes.node,
  onCountButtonClick: PropTypes.func.isRequired,
};
