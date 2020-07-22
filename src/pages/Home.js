import React ,{useState,useEffect}from 'react';
import "../assets/css/home.css";
import api from '../services/api'
import  toastr from '../../node_modules/toastr/toastr'

import Posts from '../components/Posts'
import Header from '../components/Header'

export default function Home(){
 const user = localStorage.getItem('user')
 const token = localStorage.getItem('auth-token')
 const perfil = user.split(',')
 //console.log(JSON.stringify(user))
 const [post,setPost] = useState()
 const [posts,setPosts] = useState([]) 

 const userData = {
   id: perfil[2],
   name : perfil[0],
   email: perfil[1],
   sexo: perfil[3]

 }
 
useEffect(()=>{
  async function loadPosts(){
    const res = await api.get('/posts',{
      headers: {Authorization : 'Bearer '+token}
    })
    
    setPosts(res.data.data)
  }
  loadPosts()
},[posts])



 async function handlePublish(e){
   e.preventDefault()

   try{
      const response = await api.post('/create',{
       
        
        id_user: userData.id,
        description: post,
        name: userData.name

      },
      {headers: { Authorization : "Bearer " + token}}
     
      )
      setPost('')
      toastr.success('Have fun storming the castle!', 'Miracle Max Says')
      
   }catch(error){
    toastr.error('I do not think that word means what you think it means.', 'Inconceivable!')
   }

 }
 
  return (
    <div >
      <Header/>
      <section>
        <div className='container'>
          <div className='row py-3'>
            <div className='col-12'>
              <div className='card'>
                <div className='card-body'>
                  <form onSubmit={handlePublish}>
                    <div className='row'>
                      <div className='col-6 form-group'>
                        <textarea className='form-control w-100' value={post}  onChange={e => setPost(e.target.value)} placeholder='No que você está pensando?'></textarea>
                      </div>
                      <div className='col-6 form-group d-flex align-items-center'>
                        <button className='btn-publicar' type='submit'>Publicar</button>
                      </div>
                    </div>
                   
                    
                  </form>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
     <Posts posts={posts}/>
      
    </div>
  )
}