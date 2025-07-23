
 import React, { useState } from 'react'
 import { Link, useNavigate } from 'react-router-dom';
 import Accepté from './ConnexionAceppté';
 import axios from 'axios'
import Accueil from './Accueil';

 
function Conection() {
   const [values,setValues] = useState({
       
      email : '',
      password: ''

    } );

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const handleChange = (event) =>{
         setValues(prev => ({...prev, [event.target.name]: event.target.value })) //Cela permet d’éviter les erreurs quand plusieurs mises à jour se font en même temps.
    }

     const handleSubmit = (event) =>{ 
       event.preventDefault() //empêcher l'actualisation de toute la page
       axios.post('http://localhost:5000/connecter',values)
       .then(response => {
         const data = response.data;
         if(data.nom && data.prénom){
            alert(`Bienvenue ${data.prénom} ${data.nom}`);
            localStorage.setItem('userId', response.data.id);
            navigate('/Accueil');
         }else{
            alert(data.message);
         }
       })
       .catch(error => {

         alert("Erreur de connexion")
         
       });
       setValues(Accepté(values));
       setErrors(Accepté(values));
       
    }


  return (

    
    <div className='d-flex justify-content-center align-items-center bg-primary bg-opacity-10 vh-100 '>
   
     
       <div className='bg-primary bg-opacity-75 rounded w-50 p-3'>
          <h1 className='text-light mb-3 d-flex justify-content-center align-items-center'> <strong> Connexion </strong></h1>
          
          <form action="" onSubmit={handleSubmit}>
            
            <div className="mb-3">
                <label htmlFor='email'> <strong> Email </strong>  </label>
                <input type = "email" name='email' placeholder="Adresse mail" onChange={handleChange} className='form-control rounded-0'/>
                   {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>

             <div className="mb-3">
                <label htmlFor='mdp'> <strong> Mot de passe </strong>  </label>
                <input type = "password" name='password' placeholder="Mot de passe"  onChange={handleChange} className='form-control rounded-0' />
                 {errors.password && <span className='text-danger'>{errors.password}</span>}
            </div>

            <button type='submit' className="btn btn-dark w-100"> <strong>Connexion</strong></button>
    
            <p className='pt-3 mb-1 text-light'> Pas encore de compte ?</p>

            <Link to = '/Inscription' className="btn btn-default btn btn-dark border pt-2 w-100 text-decoration-none">  <strong> Créer un compte </strong></Link>

           
        </form> 
       </div>
      
       
    </div>

    
  )
}

export default Conection;