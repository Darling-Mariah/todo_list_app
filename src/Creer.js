
import React, { useState } from 'react'
import axios from 'axios'


function Creer({tacheAdd}) {

    const [tache, setTache] = useState();
   
    const handleAdd = () => {

        const personnesId = localStorage.getItem("userId");
        if (!tache.trim()) return;

        axios.post('http://localhost:5000/ajouter',
            {
               task: tache,
               personnesId: personnesId 
           })

        .then(result => {
            tacheAdd(result.data);
            setTache("");
          console.log("Tache ajouté",result.data)
              })
        .catch(error => {console.log("Erreur",error)})
        
        
    }

  return (
    <div className='div'>
        <input placeholder=' Mes tâches' className='creation_form' type = "text" name=" " id = " " onChange={(e) => setTache(e.target.value)}  />
        <button className='creation_form1' type='button' onClick={handleAdd}> + </button>

    
    </div>
  )
}

export default Creer