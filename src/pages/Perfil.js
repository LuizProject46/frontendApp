import React, {useState,useEffect} from 'react'
import Header from '../components/Header'
import '../assets/css/perfil.css'
import api from '../services/api'
import User from '../components/User'
import Swal from 'sweetalert2'
import {Button,Modal} from 'react-bootstrap'
export default function Perfil(){
  var data = localStorage.getItem('user')
  var user = data.split(',')
  var token =localStorage.getItem('auth-token')
  var userData = {
    id: user[2],
    name: user[0],
    email: user[1],
    sexo: user[3]
  }
  const [sexo,setSexo] = useState('')
  const [infos,setInfos] = useState([])
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPass] = useState('')
  const [description,setDescription] = useState('')
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(()=>{
    async function loadInfo(){
      const res = await api.get(`user/${userData.id}`,{
        headers: {Authorization : 'Bearer '+token}
      })
      //console.log(res.data.data.name)
      setInfos(res.data.data)
    }
    loadInfo()
  },[infos])
  
  return (
    <div >
      <Header/>
      <User infos={infos}/>
      

     
     
    </div>




  )
}