import React from "react";
import { ErrorMessage } from "@hookform/error-message";
const Input = (props) => {
  return (
    <fieldset>
      <input
        type={props.type || "text"}
        {...props.register(props.name, props.filter)}
        placeholder={props.placeholder}
        className={`${props.className ? props.className : ""}form__input`}
      />
      <ErrorMessage
        errors={props.errors}
        name={props.name}
        render={({ message }) => <p className="error">{message}</p>}
      />
    </fieldset>
  );
};

export default Input;
