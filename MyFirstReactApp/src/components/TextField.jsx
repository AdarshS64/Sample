import { forwardRef, useEffect, useState } from "react";
import React from "react";

const TextField = forwardRef((props, ref) => {
  //   console.log(props)
  const onChange = (e) => {
    if (props.onChange) {
      console.log(e.target.value, props.id);
      props.onChange(e, props.id);
    }
  };

  return (
    <>
      {console.log(props.visible, props.type)}{" "}
      <span className="text-field-wrapper">
        <h6>{props.err}</h6>
        <label htmlFor={props.label}>{props.label}</label>
        <input
          data-testid="TextField-test-id"
          type={props.type}
          onChange={onChange}
          placeholder={props.placeholder}
          ref={ref}
          disabled={props.visible}
          style={props.style}
        />
      </span>
    </>
  );
});

export default TextField;
