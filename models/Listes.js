

const mongoose = require('mongoose');

const schema = mongoose.Schema;

const listeSchema = new schema ({
  personnesId : {
    type : schema.Types.ObjectId,
    ref : 'personnes'
  },

  task : String,
  done : {
    
      type : Boolean,
      default : false
        
  }
    
});


const liste = mongoose.model('Listes', listeSchema);
module.exports = liste;