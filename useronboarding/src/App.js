import React, { useState, useEffect } from 'react'
import Form from './Form.js'
import './App.css';
import axios from 'axios'
import schema from './Validator'
import * as yup from 'yup'

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
  service: false,
}
const initialDisabled = true  // Used to make the submit button disabled until conditions met
const initialBoarded = []  // Used to make the submit button disabled until conditions met

function App() {

  const [boarded, setBoarded] = useState(initialBoarded)      // array of people boarded objects
  const [formValues, setFormValues] = useState(initialFormValues) // object with all the form values
  const [formErrors, setFormErrors] = useState(initialFormErrors) // object with all the errors to be displayed
  const [disabled, setDisabled] = useState(initialDisabled)  //used to change disabled once its
  //ready to be used.
  const [users, setUsers] = useState([]) 


//Helper functions that breakdown processes into a few pieces each.
const inputChange = (name, value) =>{  // Takes the changes and uses state to update formvalues one at a time
// Also validates info
  validate(name, value)
  setFormValues({...formValues,[name]: value}) 
}

const sumbitForm=() =>{ // Submitts the information to by creating a new object sending it to postOnBoarded
const newOnBoarded ={
  name: formValues.name.trim(),  // Removes any white space at the end of our names/emails/passwords
  email: formValues.email.trim(),
  password: formValues.password.trim(),
  service: formValues.service,
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
    setBoarded([...boarded, res.data])
    setUsers([...boarded,res.data])
  }
  )
    
  .catch(err=>{
      console.log(err)
  })
    .finally(() =>{
  setFormValues(initialFormValues)  //This would a be a good place to clean form
    })
}


const validate = (name , value) => {  // let's validate this specific key/value
  yup
  .reach(schema,name)
  .validate(value)
  .then(valid=>
    setFormErrors({...formErrors, [name]:""}))
  .catch(err=>
    {
      setFormErrors({...formErrors, [name]:err.message}) // This will throw the error that is 
    })
}

useEffect(() =>{                  // This hook takes use to Yup page with schema and validates our info as well as enables submit button
  schema.isValid(formValues)
  .then(valid=> {
    setDisabled(!valid)           // this will make the submit button ok as long as the info from schema comes back ok
  })
  
},[formValues])                   // we need this here to show that this effect can only happen once formValues changes
//a [] here will make this only run once and nothing will mean this will run infintely 


  return (
    
    
    <div className="App">
     <Form
        values={formValues}    //Passes all the values from state to Form and callbacks Submit/Disabled
        change={inputChange}   //Sends our callback function inputChange as 'change' so we can use state to update formvalues one at a time
        submit={sumbitForm}    //sends callback submitform as 'submit' 
        disabled={disabled}    //Sends the value of disabled which should be true until all values are validated
        errors={formErrors}    //Sends the formsErrors as errors to be able to log the errors near the submit button
      /> 
    <div>
      <h2>Users Boarded</h2>
      <h3>Name : {users.map(obj=> obj.name)}</h3>
      <h3>Email : {users.map(obj=> obj.email)}</h3>
      <h3>Accepted Terms of Service: {users.map(obj=> obj.service) ? "Yes": "No"  }</h3>
      
      
    </div>
    </div>

  );
}

export default App;
