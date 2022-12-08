import React from "react";
import { Route, Router, Routes, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import SelectInput from "./Selectfield";
import TextField from "./Textfield";
import "./Form.css";
import "./Textfield.css";
import axios from "axios";
import { useState } from "react";

const Form = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    // navigate('/output')
  };

  // let history = useHistory();

  const [capital, setCapital] = useState(null);
  const [years, setYears] = useState("");
  const [risk, setRisk] = useState("0");
  const [dummy, setDummy] = useState(null);

  const formSubmit = async () => {
    let formField = new FormData();
    formField.append("capital", capital);
    formField.append("years", years);
    formField.append("risk", risk);
    console.log("helo");
    // console.log(response.data);

    await axios({
      method: "post",
      url: "http://localhost:8000/wel/",
      data: formField,
    }).then((response) => {
      console.log(response.data);
      //   history.push('/')
      navigate("/output");
    });
  };

  // console.log(errors)
  return (
    <div className="container">
      <div className="bg-gray-100 p-6">
        <div className="title">
          <h1>Investment Form</h1>
          <p>Please enter the details for your investment</p>
        </div>
      </div>
      <div className="form-container">
        <form className="form-elements">
          {/* <TextField
            value={capital}
            setState={setCapital}
            // {...console.log(capital)}
            // onChange={(e) => {
            //   console.log(capital);
            //   setCapital(e.target.value);
            // }}
            // {...console.log(capital)}
            label="capital"
            placeholder="10000"
            register={register}
            name="Investment Capital"
            errors={errors}
            rules={{
              maxLength: 9,
              required: true,
              min: 4,
              pattern: /^[1-9][0-9]*$/,
            }}
          /> */}
          {/* <TextField
            value={years}
            onChange={(e) => setYears(e.target.value)}
            // {...console.log(years)}
            label="years"
            placeholder="3"
            register={register}
            name="Years of Investment"
            errors={errors}
            rules={{
              maxLength: 2,
              required: true,
              min: 1,
              pattern: /^[1-9][0-9]*$/,
            }}
          /> */}
          <div className="cont">
            <div className="titlee">Investment Capital</div>

            <input
              className="input"
              type="text"
              value={capital}
              label="capital"
              placeholder="10000"
              onChange={(e) => {
                setCapital(e.target.value);
                console.log(e.target.value);
              }}
              rules={{
                maxLength: 9,
                required: true,
                min: 4,
                pattern: /^[1-9][0-9]*$/,
              }}
            />
          </div>
          <div className="cont">
            <div className="titlee">Years of Invesment</div>

            <input
              className="input"
              type="text"
              value={years}
              label="years"
              placeholder="1"
              onChange={(e) => {
                setYears(e.target.value);
                console.log(e.target.value);
              }}
              rules={{
                maxLength: 2,
                required: true,
                min: 1,
                pattern: /^[1-9][0-9]*$/,
              }}
            />
          </div>
          <div className="cont">
            <p className="titlee">Risk Willing to Take</p>
            <select
              name="risk"
              //   ref={ref}
              className="input"
              onChange={(e) => setRisk(e.target.value)}
            >
              options={["0%-5%", "5%-10%", "10%-15%", "15%-20%"]}
              <option value="0">0%-5%</option>
              <option value="1">5%-10%</option>
              <option value="2">10%-15%</option>
              <option value="3">15%-20%</option>
              {/* rules={{ required: true }} */}
            </select>
          </div>
          {/* <SelectInput
            value={risk}
            onChange={(e) => setRisk(e.target.value)}
            // {...console.log(risk)}
            {...register("risk")}
            label="Risk Willing to take"
            errors={errors}
            rules={{ required: true }}
            options={["0%-5%", "5%-10%", "10%-15%", "15%-20%"]}
          /> */}
          <input
            type="submit"
            onClick={handleSubmit(formSubmit)}
            className="btn"
          />
        </form>
        <div className="m-4 w-1/5 border bg-black ">
          {errors ? (
            <>
              {errors["capital"] && (
                <p className="text-red-500">
                  Invesment Capital: {errors["capital"].type}
                </p>
              )}
              {errors["years"] && (
                <p className="text-red-500">
                  Years of Investment: {errors["years"].type}
                </p>
              )}
              {errors["capital"] && errors["capital"].type === "required" && (
                <p className="text-red-500">required</p>
              )}
              {errors["capital"] && errors["capital"].type === "pattern" && (
                <p className="text-red-500">invalid</p>
              )}
            </>
          ) : (
            <p className="text-green">Form Submitted Successfully</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default Form;
