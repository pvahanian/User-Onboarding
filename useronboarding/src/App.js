import React, { useState, useEffect } from 'react'
import Form from './Form.js'
import './App.css';
import axios from 'axios'


const initialFormValues = {// Sets all the values to blank and makes sure terms of service isnt checked.
  name: '',                   
  email: '',
  password: '',
  service: false,
}
const initialFormErrors = {// Sets errors to nothing until we find one and need to display it.
  name: '',                 
  email: '',
  password:'',
}
const initialDisabled = true  // Used to make the submit button disabled until conditions met
const initialBoarded = []  // Used to make the submit button disabled until conditions met

function App() {

  const [boarded, setBoarded] = useState(initialBoarded)      // array of people boarded objects
  const [formValues, setFormValues] = useState(initialFormValues) // object with all the form values
  const [formErrors, setFormErrors] = useState(initialFormErrors) // object with all the errors to be displayed
  const [disabled, setDisabled] = useState(initialDisabled)  //used to change disabled once its
  //ready to be used.

//Helper functions that breakdown processes into a few pieces each.
const inputChange = (name, value) =>{  // Takes the changes and uses state to update formvalues one at a time
// Also validates info
//validate(name, value)
setFormValues({...formValues,[name]: value}) 
}

const sumbitForm=() =>{ // Submitts the information to by creating a new object sending it to postOnBoarded
const newOnBoarded ={
  name: formValues.name.trim(),  // Removes any white space at the end of our names/emails/passwords
  email: formValues.email.trim(),
  password: formValues.password.trim(),
}
postOnBoarded(newOnBoarded)  // This will post the newly created object with axios
}

const postOnBoarded = newOnboardObj => {
// #### Make a POST Request
// Being able to `POST` data is a key skill of any developer, no matter your skill level.
// - [X] Craft a `POST` request using `axios` that sends your form data to the following endpoint: _`https://reqres.in/api/users`_
// - [X] Verify using a `console.log()` that you are receiving a successful response back
// (Note: For those that are curious, we're using [reqres.in](https://reqres.in/) for this
// assignment's API. It's a free API that allows us to simulate a `POST` request for any data that we send it. Pretty awesome!)
axios.post("https://reqres.in/api/users",newOnboardObj)
  .then(res=>{
    console.log("They responded!")
  setBoarded([...boarded, res.data])})
    .catch(err=>{
      console.log(err)
    })
    .finally(() =>{
    setFormValues(initialFormValues)    //This would a be a good place to clean form
    })
}


  return (
    <div className="App">
     <Form
        values={formValues}    //Passes all the values from state to Form and callbacks Submit/Disabled
        change={inputChange}
        submit={sumbitForm}
        disabled={disabled}
        errors={formErrors} />
    </div>
  );
}

export default App;
