import React from "react";
import { useEffect } from "react";
import "./Textfield.css";

const TextField = ({
  label,
  register,
  rules,
  placeholder,
  errors,
  name,
  type,
  setState,
  value,
}) => {
  useEffect(() => {
    console.log(setState);
  }, []);
  return (
    <div className="cont">
      <p className="titlee">{name}</p>
      <input
        value={value}
        onChange={(e) => {
          console.log(e.target.value);
          console.log(setState);
          setState(e.target.value);
        }}
        placeholder={placeholder}
        type={type}
        className="input"
        // {...register(label, { ...rules })}
      />
      {errors[label] && errors[label].type === "required" && (
        <p className="mb-3 text-red-500 text-left">{name} is required</p>
      )}
      {errors[label] && errors[label].type === "maxLength" && (
        <p className="mb-3 text-red-500 text-left">
          {name} should be have maximum of {rules.maxLength} characters
        </p>
      )}
      {errors[label] && errors[label].type === "min" && (
        <p className="mb-3 text-red-500 text-left">
          {name} should be contain atleast {rules.min} characters
        </p>
      )}
      {errors[label] && errors[label].type === "pattern" && (
        <p className="mb-3 text-red-500 text-left">{name} is invalid</p>
      )}
    </div>
  );
};
export default TextField;
