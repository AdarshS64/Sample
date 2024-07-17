import React from "react";

const Button = (props) => {
  return (
    <>
      <button
        data-testid="button-test-id"
        onClick={props.handleSub}
        className={props.className}
        style={{ background: props.color, color: props.textcolor }}
      >
        {props.value}
      </button>
    </>
  );
};

export default Button;
