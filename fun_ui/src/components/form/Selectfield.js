import React from 'react';
import './Textfield.css'
const SelectInput = React.forwardRef(({ onChange, name, label, options, errors, rules }, ref) => {
    return (
        <div className='cont'>
            <p className="titlee">{label}</p>
            <select 
                name={name}  
                ref={ref} 
                className="input"
                onChange={onChange}
            >
                {options && options.map(item => (
                    <option value={item}>{item}</option>
                ))}
            </select>
        </div>
    )
});
export default SelectInput;