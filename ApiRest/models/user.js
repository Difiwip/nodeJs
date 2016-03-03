var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

mongoose.connect("mongodb://Difiwip:nicolas1@ds049624.mlab.com:49624/usuarios",function(err,res){
  if (err) {
    console.log("Error conectando a la db: " + err);
  }
});


var Usuario = new Schema({
  nick: {type: String, required:true,maxleght:[20,"Username muy grande"]},
  email: String,
  password: {type: String},
});

var User = mongoose.model("Usuarios",Usuario);

module.exports.User = User;
