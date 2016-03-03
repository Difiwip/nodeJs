var mongoose = require("mongoose");
var Schema = mongoose.Schema;


mongoose.connect("mongodb://Difiwip:nicolas1@ds011168.mongolab.com:11168/fotos");

var userSchemaJSON = {
	nick: {type: String, required:true,maxleght:[20,"Username muy grande"]},
	email: String,
	password: {type: String,minlength:[8,"El password es muy corto"]},
};


var user_schema = new Schema(userSchemaJSON);

var User = mongoose.model("Usuarios",user_schema);

module.exports.User = User;
