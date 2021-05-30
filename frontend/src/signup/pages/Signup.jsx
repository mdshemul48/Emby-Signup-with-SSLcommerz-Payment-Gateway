import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// signup page
import "./Signup.css";
const Signup = () => {
  // changing title of the page.
  document.title = "Signup page";

  const [uniqueUsername, setUniqueUsername] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // this will handle after click submit the form.
  const onSubmitHandler = (data) => {
    const { username, email, password, name, number } = data;

    const createPaymentSession = async () => {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/api/payment",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            username,
            email,
            password,
            name,
            number,
          }),
        }
      );

      if (!response.ok) {
        console.log(response);
        return alert("something wrong with the server please try again.");
      }
      const responseText = await response.json();
      if (!responseText.successful) {
        return alert("something wrong with the server please try again.");
      }

      return window.open(responseText.link, "_self");
    };
    createPaymentSession();
  };

  // this will check if user already exist in the server or not.
  const userExistHandler = async (username) => {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + `/api/user/username`,
      {
        body: JSON.stringify({
          username,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );

    if (!response.ok) {
      return alert("something wrong wth the username check function");
    }

    const responseText = await response.json();
    if (!responseText.successful) {
      return alert("something wrong wth the username check function");
    }
    setUniqueUsername(responseText.found);
  };

  // getting username and calling userExistHandler
  const checkUsernameHandler = () => {
    const username = watch("username");
    userExistHandler(username);
  };

  return (
    <div className="container">
      <form
        className="form"
        id="contact"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <h3>Emby Signup page</h3>
        <h4>Contact us for custom quote</h4>
        {uniqueUsername && (
          <h4 className="error">
            Username already exist. Please choose another one.
          </h4>
        )}
        <fieldset>
          <input
            type="text"
            placeholder="Full Name"
            className="form__input"
            {...register("name")}
          />
        </fieldset>

        <fieldset>
          <input
            {...register("number")}
            type="tel"
            placeholder="Phone Number"
            className="form__input"
          />
        </fieldset>
        <fieldset>
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className="form__input"
          />
        </fieldset>
        <fieldset>
          <input
            type="text"
            {...register("username")}
            placeholder="Username"
            className="form__input"
            onBlur={checkUsernameHandler}
          />
        </fieldset>
        <fieldset>
          <input
            type="password"
            {...register("password", { min: 8 })}
            placeholder="Password"
            className="form__input"
          />
        </fieldset>

        <fieldset>
          <button className="btn" type="submit">
            Pay and Register
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Signup;
