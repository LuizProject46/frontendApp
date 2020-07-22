import React from 'react'
import userIcon from '../assets/img/user.png'
import '../assets/css/home.css'
import api from '../services/api'

export default function Posts({posts}){
  const token = localStorage.getItem("auth-token")
 async function handlLike(id){
      try{
        await api.post(`/like/${id}`,null,
          {headers: { Authorization : "Bearer " + token}
        })
      }catch(error){
        //toastr.error('I do not think that word means what you think it means.', 'Inconceivable!')
        alert("erro")
      }
   }
   async function handleDeslike(id){
    try{
      await api.post(`/deslike/${id}`,null,{
        headers: {Authorization : `Bearer ${token}`}
      })
    }catch(error){
      alert("erro")
    }
 }
  return (
    <section>
    <div className='container'>
    <div className='row'>
    <div className='col-12'>
      <div className='card'>
        <ul>
          {posts.map(post => (
            <li key={post.id}>
            <div className='user-name'>
              <img src={userIcon}/>
          <h3>{post.name}</h3>
              
            </div>
            <div className='description-puplish'>
            <p>{post.description}</p>
            </div>
            <div className='reaction-publish'>
            <a onClick={() => handlLike(post.id)} className='like'><i className='fa fa-thumbs-up'></i></a>{post.likes}
              <a onClick={() => handleDeslike(post.id)} className='deslike'><i className='fa fa-thumbs-down'></i></a>{post.deslikes}
            </div>
            <hr/>
          
          </li>

           ))

          } 
          
        </ul>
      </div>
    </div>
    </div>
    </div>
    
  </section>

  )
}