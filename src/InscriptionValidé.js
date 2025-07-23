


function Validé(values) {

      //alert();
     let error = {};

     const mail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expression régulière pour valider une adresse email classique (ex: exemple@mail.com).
     const mdp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/; // Cette regex valide un mot de passe fort avec les conditions suivantes : Au moins une majuscule ([A-Z]), Au moins une minuscule ([a-z]),Au moins un chiffre (\d), Au moins 8 caractères, Au moins 8 caractères
     
     if(values.nom === "") {
      error.nom = "Saisissez votre nom!!"
      }
   
     else {
     error.nom = ""
    }

    if(values.prénom === "") {
      error.prénom = "Saisissez votre prénom!!"
      }
   
     else {
     error.prénom = ""
    }

    if(values.email === "") {
    error.email = "Saisissez votre email!!"
  }

  else if(!mail.test(values.email)) {
    error.email = "Email incorrect!!"
  }

  else {
    error.email = ""
  }


   if(values.password === "") {
    error.password = "Saisissez votre mot de passe!!"
  }

  else if(!mdp.test(values.password)) {
    error.password = "Mot de passe incorrect!!"
  }

  else {
    error.password = ""
  }

  return error;
}
    

export default Validé