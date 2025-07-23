
const mongoose = require('mongoose');

const schema = mongoose.Schema;

const personneSchema = new schema ({
  nom: String,
  prénom: String,
  email: String,
  password : String,
 
});

const personne = mongoose.model('Personnes', personneSchema);
module.exports = personne;