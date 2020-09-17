import React from 'react'

export default function UsersApp(props){
    const {user}=props
    const {name, email, service}= user
    return(
        <div> 
        <h3>Name : {name}</h3>
        <h3>Email : {email}</h3>
        <h3>Accepted Terms of Service: {service ? "Yes": "No"  }</h3>
        </div>
    )
}