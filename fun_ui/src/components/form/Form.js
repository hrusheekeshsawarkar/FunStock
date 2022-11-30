import React from 'react';
import { Route, Router, Routes, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import SelectInput from './Selectfield';
import TextField from './Textfield';
import './Form.css'

const Form = () => {

    const { handleSubmit, formState: { errors }, register } = useForm();

    const onSubmit = (data) => {
        console.log(data)
    }
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
                    <TextField 
                        className="textfield"
                        label="firstName"
                        placeholder="John"
                        register={register}
                        name="First name"
                        errors={errors}
                        rules={{ maxLength: 20, required: true, min: 3 }}
                    />
                    <TextField 
                        label="lastName"
                        placeholder="Doe"
                        register={register}
                        name="Last name"
                        errors={errors}
                        rules={{ maxLength: 20, required: true, min: 3 }}
                    />
                    <TextField 
                        label="email"
                        placeholder="johndoe@gmail.com"
                        register={register}
                        name="Email"
                        errors={errors}
                        rules={{ required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ }}
                    />
                    <SelectInput 
                        {...register('role')}
                        label="Select role"
                        errors={errors}
                        rules={{ required: true }}
                        options={['Male', 'Femail', 'Others']}
                    />
                    <input 
                        type="submit"
                        onClick={handleSubmit(onSubmit)}
                        className="btn"
                    /> 
                </form>
                <div className="m-4 w-1/5 border bg-black ">
                    {errors ? (
                        <>
                            {errors['firstName'] && <p className="text-red-500">First Name: {errors['email'].type}</p>}
                            {errors['lastName'] && <p className="text-red-500">Last Name: {errors['email'].type}</p>}
                            {errors['email'] && errors['email'].type === 'required' && <p className="text-red-500">Email is required</p>}
                            {errors['email'] && errors['email'].type === 'pattern' && <p className="text-red-500">Email is invalid</p>}
                        </>
                    ):
                        <p className="text-green">Form Submitted Successfully</p>
                    }
                </div>
            </div>

        </div>
    )
};
export default Form;