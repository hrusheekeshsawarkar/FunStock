import React from 'react';
import { Route, Router, Routes, Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import SelectInput from './Selectfield';
import TextField from './Textfield';
import './Form.css'

const Form = () => {

    const { handleSubmit, formState: { errors }, register } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data)
        navigate('/output')
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
                        label="capital"
                        placeholder="10000"
                        register={register}
                        name="Investment Capital"
                        errors={errors}
                        rules={{ maxLength: 9, required: true, min: 4, pattern: /^[1-9][0-9]*$/ }}
                    />
                    <TextField 
                        label="years"
                        placeholder="3"
                        register={register}
                        name="Years of Investment"
                        errors={errors}
                        rules={{ maxLength: 2, required: true, min: 1, pattern: /^[1-9][0-9]*$/ }}
                    />
                    <SelectInput 
                        {...register('risk')}
                        label="Risk Willing to take"
                        errors={errors}
                        rules={{ required: true }}
                        options={['0%-5%', '5%-10%', '10%-15%', '15%-20%']}
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
                            {errors['capital'] && <p className="text-red-500">Invesment Capital: {errors['capital'].type}</p>}
                            {errors['years'] && <p className="text-red-500">Years of Investment: {errors['years'].type}</p>}
                            {errors['capital'] && errors['capital'].type === 'required' && <p className="text-red-500">Email is required</p>}
                            {errors['capital'] && errors['capital'].type === 'pattern' && <p className="text-red-500">Email is invalid</p>}
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