import React,{useState} from 'react'
import "../assets/css/signup.css";
import api from '../services/api'
import Swal from 'sweetalert2'
import logo from  '../assets/img/logo.png'
import  'font-awesome/css/font-awesome.min.css'
export default function Signup({history}){
  const [email,setEmail] = useState('')
  const [password,setPass] = useState('')
  const [name,setName] = useState('')
  const [sexo,setSexo] = useState('feminino')
  


 async function handleForm(e){
    e.preventDefault()
    try{
       await api.post("/register",{
        name: name,
        email: email,
        password: password,
        sexo: sexo
      })
      Swal.fire({ title: "Sucesso",text: "Cadastro efetuado com sucesso!",icon: "success",button: "Ok",});
      history.push('/login')
      
    }catch(err){
      Swal.fire({ title: "Ops!",text: "Já existe uma conta com esse email,por favor, tente outro.",icon: "error",button: "Ok",});
      console.log(err)
    }
    

  }
  return (
  <div className="login-container">
   
  <form onSubmit={handleForm} >
  <img  src={logo}/>
  <h2>Cadastro</h2>
  <input
    placeholder='Nome'
    value={name}
    onChange={e => setName(e.target.value) }
    />
    <input
    placeholder='Email'
    value={email}
    onChange={e => setEmail(e.target.value) }
    />
    <input
    placeholder='Senha'
    type="password"
    value={password}
    onChange={e=> setPass(e.target.value)}
    />
    <select value={sexo} className='select' onChange={e => setSexo(e.target.value)}>
     <option value='feminino'>Feminino</option>
     <option value='masculino'>Masculino</option>
    </select>
    <button type='submit'>Cadastrar</button>
    
  </form>

</div>
  )
}