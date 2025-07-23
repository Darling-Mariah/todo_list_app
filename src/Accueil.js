
import React, { useEffect, useState } from 'react'
import Creer from './Creer'
import axios from 'axios'
import { BsCircleFill, BsTrash } from "react-icons/bs";
import { BsCheckCircleFill } from 'react-icons/bs';

function Accueil() {

    const [todo, setTodo] = useState([]);

    useEffect(() => {

        const personnesId = localStorage.getItem("userId");
        
        if(personnesId){
          axios.get(`http://localhost:5000/get/${personnesId}`)
          .then(result => {setTodo(result.data)})
          .catch(err =>  {console.log(err)})
        }

    }, [])

    const handleClick = (id) => {

         
        const personnesId = localStorage.getItem("userId");
        
        if(personnesId){
          axios.put(`http://localhost:5000/put/${id}`,{personnesId})
          .then((res) => {
             
                const updateTache = res.data; 
                       
                setTodo(prev =>
                prev.map(t => t._id === id ? { ...t, done: updateTache.done } : t)
                    );
                         })
          .catch(err =>  {console.log(err)})
        }


    }

    const handleDelete = (id) => {

      const personnesId = localStorage.getItem("userId");
        
      axios.delete(`http://localhost:5000/delete/${id}`, {data : {personnesId}})
      .then(() => {setTodo(todo.filter(t =>t._id !== id));

      })
      .then(err => {console.log(" Erreur lors de la suppression ",err);
      })

    }

    const handleTacheAdd = (nouvelleTache) => {
    setTodo(prev => [...prev, nouvelleTache]);
    }
  return (
    <div className = 'container'>
        <h1  className='Accueil'> Todo List </h1> 
        <Creer tacheAdd = {handleTacheAdd}/>
             {
                todo.length === 0 ?
                <div><h2> Aucun Enregistrement </h2> </div>
                 :
                 todo.map((tache, index) =>(
                    
                    <div className='tache' key = {index}>
                            <div className='checkBox' onClick = { () => {handleClick(tache._id)}}>

                               { tache.done ? 
                                     <BsCheckCircleFill  className='icon'> </BsCheckCircleFill> 
                                    : <BsCircleFill className='icon' />
                        
                               }
                                
                                 <p className={tache.done ?  "tacheBarré" : ""}  > {tache.task} </p> 

                            </div>
                              <div>
                                  <span> <BsTrash className='icon'  onClick={() => handleDelete(tache._id)} /> </span>
                              </div>
                                 
                        </div>

                 ))
                 
                 
             }        
        
    </div>
  )
}

export default Accueil