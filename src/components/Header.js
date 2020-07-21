import React from 'react'


export default function Header({history}){
  const data = localStorage.getItem('user')
  var user = data.split(',')
  var name = user[0].split(' ')

  function handleSignOut(){
      localStorage.removeItem('auth-token')
      localStorage.removeItem('user')
      history.push('/login')
  }
  function handlePerfil(){
    history.push('/perfil')
  }
  return(
    <header className="header">
    <ul>
      <li><a href="/"><i style={{fontSize: 20}} className='fa fa-comments-o'></i> SocialSociety</a></li>
      <li style={{float: 'right',padding: 0}}><a href="/"  onClick={handleSignOut}><i style={{fontSize: 20}}  className='fa fa-sign-out'></i> Sair</a></li>
      <li style={{float: 'right',padding: 0,paddingLeft:15}}><a href="/perfil"  onClick={handlePerfil}><i style={{fontSize: 20}}  className='fa fa-user'></i>  {name[0]} </a></li>
      
     
    </ul>
  </header>
  )
}