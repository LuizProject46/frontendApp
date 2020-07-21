import React from "react"

import {Route,Redirect }from 'react-router-dom'

export default function PrivateRoute(props){
  const isLogged = !!localStorage.getItem("auth-token")
 
  return isLogged ? <Route {...props}/> : <Redirect to='/login'/>
}