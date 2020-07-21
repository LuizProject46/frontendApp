import React,{useState} from "react"
import '../assets/css/login.css'
import Swal from 'sweetalert2/dist/sweetalert2'
import api from '../services/api'
import logo from "../assets/img/logo.png"
import  'font-awesome/css/font-awesome.min.css'

export default function Login ({history}){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  
  async function handleSubmit(e){
    e.preventDefault()
    try{
      const response = await api.post('/authenticate',{
        email: email,
        password: password
      })
      if(response){
        const {token,user } = response.data
        const userInfo = [user.name,user.email,user.id,user.sexo]
        localStorage.setItem("auth-token",token)
        localStorage.setItem("user",userInfo)
        history.push('/')

      }
      
    }catch(error){
      Swal.fire({ title: "Ops!",text: "Email ou senha inválidos.",icon: "error",button: "Ok",});
    }
    
    

  }
  return (
    <div className="login-container">
      
      <form onSubmit={handleSubmit}> 
      <img  src={logo}/>
        <input
        placeholder='Email'
        value={email}
        onChange={e=> setEmail(e.target.value)}
        />
        <input
        placeholder='Senha'
        type="password"
        value={password}
        onChange={e=> setPassword(e.target.value)}
        />
        <button type='submit'><i className='fa fa-sign-in'></i>  Entrar</button>
        <a href="/signup">Cadastre-se!</a>
      </form>
   
    </div>
  )
}

