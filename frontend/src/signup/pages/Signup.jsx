import React, { useState } from "react";
// signup page
import SignUpForm from "../components/SignUpForm";
import "./Signup.css";
const Signup = () => {
  // changing title of the page.
  document.title = "Signup page";

  const [uniqueUsername, setUniqueUsername] = useState(false);

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
    return responseText.found;
  };

  // getting username and calling userExistHandler

  return (
    <div className="container">
      <SignUpForm
        onSubmitHandler={onSubmitHandler}
        userExistHandler={userExistHandler}
        uniqueUsername={uniqueUsername}
      />
    </div>
  );
};

export default Signup;
