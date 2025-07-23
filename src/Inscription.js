
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Validé from './InscriptionValidé';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



function Inscription() {
   
  const [values,setValues] = useState({
         
          nom : '',
          prénom: '',
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
         axios.post('http://localhost:5000/inscrit',values);
         setValues(Validé(values));
         setErrors(Validé(values));
         navigate('/');
      }

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary bg-opacity-10 vh-100 '>
     
       <div className='bg-primary bg-opacity-75 rounded w-50 p-3'>
          <h1 className='text-light mb-3 d-flex justify-content-center align-items-center'> <strong> Inscription </strong></h1>
          <form action="" onSubmit={handleSubmit} >

             <div className="mb-3 ">
                <label htmlFor='nom'> <strong> Nom </strong>  </label>
                <input type = "text" onChange={handleChange} placeholder="Nom" name='nom' className='form-control rounded-0'/>
                {errors.nom && <span className='text-danger'>{errors.nom}</span>}
            </div>

            <div className="mb-3 ">
                <label htmlFor='prénom'> <strong> Prénom </strong>  </label>
                <input type = "text" onChange={handleChange} placeholder="Prénom" name='prénom' className='form-control rounded-0'/>
                {errors.prénom && <span className='text-danger'>{errors.prénom}</span>}
            </div>
            
            <div className="mb-3 ">
                <label htmlFor='email'> <strong> Email </strong>  </label>
                <input type = "email" onChange={handleChange}  placeholder="Adresse mail" name='email' className='form-control rounded-0'/>
                {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>

             <div className="mb-3">
                <label htmlFor='mdp'> <strong> Mot de passe </strong>  </label>
                <input type = "password" onChange={handleChange} placeholder="Mot de passe" name='password' className='form-control rounded-0' />
                {errors.password && <span className='text-danger'>{errors.password}</span>}
            </div>

            <button type='submit' className="btn btn-dark w-100"> <strong>Créer</strong></button>
    
            <p className='pt-3 mb-1 text-light'> Déjà un compte ?</p>

            <Link to = '/Conection' className="btn btn-default btn btn-dark border pt-2 w-100 text-decoration-none">  <strong> Connectez-vous </strong></Link>

           
        </form> 
       </div>
    </div>
  );
}

export default Inscription