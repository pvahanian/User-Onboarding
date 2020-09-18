import * as yup from 'yup'  // Neccessary to bring in all the properties from yup

export default yup.object().shape({  //calls up and yups functions .requried .email .min
name: yup.string()
    .required('Username is required')
    .min(5, 'Username must be 5 chars or longer'),
email: yup.string()
    .email('Must be a valid email')
    .required('Email is required'), 
password: yup.string()
    .min(5,'Password must be 5 chars or longer')
    .required('Password is required'),
// we are done with checkboxes
    service: yup.boolean().oneOf([true], "Please accept Terms of Service"),  // Checkes with oneOf([true]) to insure the 
    //value is true or else it says "message"
})
