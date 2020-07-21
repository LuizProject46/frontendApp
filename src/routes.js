import React from 'react'
import {BrowserRouter,Route,Router,Switch} from 'react-router-dom'
import Home from'./pages/Home'
import Login from './pages/Login'
import Signup from  './pages/Signup'
import Perfil from './pages/Perfil'
import PrivateRoute from './components/PrivateRoute'
import  NotFound from './components/NotFound'
export default function Routes(){
  return(
    <BrowserRouter>
      <Switch>
          <Route path='/login'  component={Login}/>
          <Route path='/signup' component={Signup}/>
          <PrivateRoute path='/' exact component={Home}/>
          <PrivateRoute path='/perfil' component={Perfil}/>
          <PrivateRoute component={NotFound}/>
      </Switch>
    </BrowserRouter>
      
      
    
  )
}