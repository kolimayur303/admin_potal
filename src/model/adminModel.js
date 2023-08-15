const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({

  admin_first_name:{
    type : String
  },
  admin_last_name:{
    type : String
  },
  email:{
      type : String,
      required: true,
      unique: true
  },
  password:{
    type : String,
    required: true,
    unique: true
  },
  experiment_name:{
    type : String
  },
  description:{
    type : String
  },
  difficulty_level:{
    type : String
  },Subject:{
    type : String
  },
  main_image:{
    type : String
  },
  materials_list:{
    type : String
  },
  safety_precautions:{
    type : String
  },
  instructions:{
    type : String
  },


});

adminSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject.id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model("Admin", adminSchema);
