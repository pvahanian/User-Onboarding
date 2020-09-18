import React from 'react'


export default function Form (props) {
    const {disabled,values, submit,change,errors} = props

    const onSubmit = evt => {  // Onsubmit is an event handler that will prevent reloading and also
        evt.preventDefault()   // call the submit function
        submit()
}
    const onChange = evt => { //If the value of the target (typed or selected) changes send it to the change function to update state
        const{name, value ,type, checked} = evt.target
        const valueToUse = type === 'checkbox'? checked : value // this checks to see if the type=checkbox type then send checked else send value
        change(name, valueToUse) 
    }

    return(

    <form className='form container' onSubmit={onSubmit}> 
        <div className='form-group inputs'>
        <h2>On Boarding Sign in</h2>
        {/* ////////// TEXT INPUTS ////////// */}
        <label>Name&nbsp;
            <input
            value={values.name}
            onChange={onChange}
            name='name'
            type='text'
            />
        </label>
            <label>&nbsp;Email&nbsp;
            <input
            value={values.email}
            onChange={onChange}
            name='email'
            type='text'
            />
        </label>
        <label>&nbsp;Password&nbsp;
            <input
            value={values.password}
            onChange={onChange}
            name='password'
            type='text'
            />
        </label>
        </div>
    
        <div className='form-group checkboxes'>
        {/* ////////// CHECKBOXES ////////// */}
        <label>Terms of Service
            <input
            value={values.service}
            onChange={onChange}
            type="checkbox"
            name="service"
            />
        </label>
        </div>
        <div className='form-group submit'>
        <button disabled={disabled} id='submitBtn'>Submit</button> 
        </div>
        <div className='errors'>
            {/* 🔥 RENDER THE VALIDATION ERRORS HERE @@@@@Leave blank until error handler setup */}
            <div>{errors.name}</div>
            <div>{errors.email}</div>
            <div>{errors.password}</div>
            <div>{errors.service}</div>
        </div>  
    </form>
    )
}