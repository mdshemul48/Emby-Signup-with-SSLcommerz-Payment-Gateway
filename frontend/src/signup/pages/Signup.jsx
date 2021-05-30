import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// signup page
import "./Signup.css";
const Signup = () => {
  // changing title of the page.
  document.title = "Signup page";

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

  console.log(watch("username"));

  return (
    <div className="user">
      <header className="user__header">
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3219/logo.svg"
          alt=""
        />
        <h1 className="user__title">A signup page for circle emby server.</h1>
      </header>

      <form className="form" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="form__group">
          <input
            type="text"
            placeholder="Full Name"
            className="form__input"
            {...register("name")}
          />
        </div>

        <div className="form__group">
          <input
            type="text"
            {...register("number")}
            placeholder="Phone Number"
            className="form__input"
          />
        </div>
        <div className="form__group">
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className="form__input"
          />
        </div>
        <div className="form__group">
          <input
            type="text"
            {...register("username")}
            placeholder="Username"
            className="form__input"
          />
        </div>
        <div className="form__group">
          <input
            type="password"
            {...register("password", { min: 8 })}
            placeholder="Password"
            className="form__input"
          />
        </div>

        <button className="btn" type="submit">
          Pay and Register
        </button>
      </form>
    </div>
  );
};

export default Signup;
