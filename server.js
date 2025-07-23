
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");  //protection de sécurité des navigateurs web qui empêche (ou autorise) un site web d'accéder à des ressources (API, images, données...)
const personne = require("./models/Personnes");
const liste = require("./models/Listes");
const app = express();
app.use(cors());
app.use(express.json());
const db = 'mongodb+srv://darlingmariahakpo:user2@cluster0.za9pdoi.mongodb.net/Employées?retryWrites=true&w=majority';
mongoose.connect(db)


.then((result)=>{
    app.listen(5000);
    console.log('Connexion à la bdd réussie');
    
})
.catch((err) =>{
    console.log(err);
});

//s'inscrire
app.post('/inscrit', async (req, res)=>{
  
    personne.create(req.body)
    .then(personnes => res.json(personnes))
    .catch(err => res.json(err))
    
});

//se connecter
app.post('/connecter', async (req, res)=>{
  
    const {email, password} = req.body;

    try{

        const utilisateur = await personne.findOne({email: email})
        
         if(!utilisateur) {
           return res.json({message: "Identifiant incorrecte"}) 
       }

       if(utilisateur.password !== password ) {
           return res.json({message: "Mot de passe incorrecte"}) 
       }
        
       //connexion réussie
        return res.json({message : "Bienvenue ",
        nom : utilisateur.nom,
        prénom: utilisateur.prénom,
        id: utilisateur._id ,
       });
    }catch (err) {
            return res.json({message : "Erreur ", erreur : err}) ;        
       }
       

    })


//ajout dans la bdd
app.post('/ajouter', async (req, res)=>{
      
     const {task,personnesId} = req.body;
     console.log("Tache ajoutée", task, 'pour', personnesId);
     
     liste.create({
        task : task,
        personnesId : personnesId   
    })
    .then(listes => res.json(listes))
    .catch(err =>{console.log("erreur", err)
        res.json(err)
    } )

});



app.get('/get/:userId', async (req, res)=>{
      
   try {
    const personneId = req.params.userId;
    const taches = await liste.find({ personnesId: personneId });
    res.json(taches);
  } catch (error) {
    console.error("Erreur lors de la récupération des tâches :", error);
    res.json({ message: "Erreur serveur" });
  }
});


app.put('/put/:id', async (req, res)=>{
      
   try {
    const {id} = req.params;
    const { personnesId } = req.body;
    const taches = await liste.findOne({personnesId, _id : id});
    taches.done = !taches.done;
    await taches.save();
    res.json(taches);
  } catch (error) {
    console.error("Erreur :", error);
    res.json({ message: "Erreur serveur" });
  }
});


app.delete('/delete/:id', async (req, res)=>{

    try {
    const {id} = req.params;
    const { personnesId } = req.body;
    const tacheDelete = await liste.deleteOne({personnesId, _id : id});
    if (tacheDelete.deletedCount === 1){
        res.json({message : "Tâche supprimée"})

     }else {
      res.json({ message: "Tâche non trouvée" });
      }
  }
    catch (error) {
    console.error("Erreur:", error);
    res.json({ message: "Erreur serveur" });
  }
  

});
      