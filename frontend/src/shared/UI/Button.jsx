import React from "react";

import style from "./Button.module.css";
const Button = (props) => {
  console.log(style);
  return (
    <button type={props.type} className={`${style.button} ${props.className}`}>
      {props.children}
    </button>
  );
};

export default Button;
