var http = require("http"); // Variable http
var express = require("express");
var mongoose = require("mongoose");
var bodyParse = require("body-parser");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/fotos");

var userSchemaJSON = {
	email: String,
	password: String,
};

var user_schema = new Schema(userSchemaJSON);

var User = mongoose.model("User",user_schema);

var app = express();

app.set("view engine",  "jade");

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));

app.get("/",function(req,res) {
	res.render("index");
});

app.get("/peticion",function(req,res){
	User.find(function(err,doc){
		console.log(doc);
	});
	res.render("peticion");
});

app.post("/confirmado",function(req,res){
	var user = new User({email: req.body.mail, password: req.body.password});

	user.save(function(){
		res.send("Usuario almacenado");
	});
});

app.listen(8080);