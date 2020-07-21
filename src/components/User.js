import React,{useState} from 'react'
import  {Button,Modal,Form} from 'react-bootstrap'
import Swal from 'sweetalert2'
import api from '../services/api'
import userIcon from "../assets/img/user.png"
export default function User({infos}){

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPass] = useState('')
  const [description,setDescription] = useState('')
  const [sexo,setSexo] = useState('')
  const [show, setShow] = useState(false);

  var data = localStorage.getItem('user')
  var user = data.split(',')
  var token =localStorage.getItem('auth-token')
  
  var userData = {
    id: user[2],
    name: user[0],
    email: user[1],
    sexo: user[3]
  }
 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleUpdate(e){
    e.defaultPrevent()
    
    try{
       var response = await api.post(`/update/${userData.id}`,{
       
        
        name: name,
        description: description,
        email: email,
        sexo: sexo

      },
      {headers: { Authorization : "Bearer " + token}}
     
      )
      
        if(response){
         
          const {data } = response.data
          const user = [data.name,data.email,data.id,data.sexo]
          localStorage.setItem("user",user)
          Swal.fire({ title: "Sucesso",text: "Informações alteradas com sucesso!",icon: "success",button: "Ok",});
        }
        
      
      
      
   }catch(error){
    Swal.fire({ title: "Ops!",text: "Algum erro no sistem, aguarde 5 minutos e tente novamente.",icon: "error",button: "Ok",});
   }

  }
  return (
    <div>
  
        
        <section >
         <div className='container'>
           <div className='row py-3'>
             <div className='col-12'>
               <div className='card'>
                 <div className='card-body'>
                     <div className='bio-container'>
                         <div  className='photo-perfil'>
                             <img src={userIcon}/>
                             {/* <a style={{color: 'white'}} data-toggle="modal" data-target="#exampleModal"><i className='fa fa-pencil'></i>  Editar</a> */}
                             <Button className='btn-modal'  onClick={handleShow}>
                               <i className='fa fa-pencil'></i>
                                  Editar
                              </Button>
                              
                         </div>
                        
 
                     </div>
                     
                       <div className='edit-perfil'>
                         <h3 style={{color:'#444',display: 'flex', justifyContent: 'center',marginBottom: 10,marginTop: 5,fontWeight:'bold'}}>{infos.name}</h3>
                         
                       </div>
                       <div className='bio-container'>
                          Seguidores <label className='badge badge-primary'>{infos.followers}</label>
                          Seguindo <label className='badge badge-primary'>{infos.following}</label>
                       </div>
                      
                       
                     <hr/>
                     <div className='bio-container'>
                      <p>{infos.description === '' || infos.description == null ? <b>Fale mais sobre você :)</b> : infos.description}  </p>
                     </div>
                    
                 </div>
               </div>
             </div>
           </div>
           
         </div>
       </section>
       <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='card-body perfil-container'>
                  
                  <form onSubmit={handleUpdate} >
                  
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
                      <textarea value={description}  onChange={e=> setDescription(e.target.value)} className='form-control'></textarea>
                      <br/>
                      <select value={sexo} className='select'  onChange={e => setSexo(e.target.value)}>
                      <option value='feminino'>Feminino</option>
                      <option value='masculino'>Masculino</option>
                      </select>
                      <div className="modal-footer">
                       
                      </div>
                      <Modal.Footer>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                        <button type="submit" className="btn-modal2 btn">Salvar</button>
                      </Modal.Footer>
                 
                    
                  </form>

                  
                </div>
        </Modal.Body>
        
      </Modal>
      
      </div>
  )
}