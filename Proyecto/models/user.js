var mongoose = require("mongoose");
var Schema = mongoose.Schema;


mongoose.connect("mongodb://localhost/fotos");

var userSchemaJSON = {
	nick: String,
	email: String,
	password: String,
};


var user_schema = new Schema(userSchemaJSON);

var User = mongoose.model("Usuarios",user_schema);

module.exports.User = User;