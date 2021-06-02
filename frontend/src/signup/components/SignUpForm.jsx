import React from "react";
import { useForm } from "react-hook-form";

// castom imports
import Button from "../../shared/UI/Button";
import Input from "./Input";
import style from "./SignUpForm.module.css";
const SignUpForm = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const checkUsernameHandler = () => {
    const username = watch("username");
    props.userExistHandler(username);
  };
  return (
    <form
      className="form"
      id="contact"
      onSubmit={handleSubmit(props.onSubmitHandler)}
    >
      <h3>Emby Signup page</h3>
      <h4>Contact us for any quote</h4>
      {errors.password?.message && (
        <h4 className="error">{errors.password?.message}</h4>
      )}
      <Input
        register={register}
        name="name"
        placeholder="Full Name"
        filter={{ required: "Name is required." }}
        errors={errors}
      />
      <Input
        register={register}
        name="address"
        placeholder="Address"
        filter={{ required: "Address is required" }}
        errors={errors}
      />
      <Input
        register={register}
        name="email"
        placeholder="Email"
        filter={{ required: "Email is required" }}
        errors={errors}
      />
      <Input
        register={register}
        name="number"
        placeholder="Number"
        filter={{ required: "Number is required" }}
        errors={errors}
      />
      <Input
        register={register}
        name="bkash"
        placeholder="Bkash Transaction Id"
        filter={{ required: "Bkash Transaction Id is required" }}
        errors={errors}
      />
      <Input
        register={register}
        name="username"
        placeholder="Username"
        filter={{
          required: "Username is required",
        }}
        errors={errors}
      />
      <Input
        register={register}
        name="password"
        placeholder="Password"
        filter={{
          required: "Username is required",
          minLength: {
            value: 8,
            message: "Your password must be at least 8 characters",
          },
        }}
        errors={errors}
        type="password"
      />

      <fieldset>
        <Button className={style.signup__btn}>Register</Button>
      </fieldset>
    </form>
  );
};

export default SignUpForm;
