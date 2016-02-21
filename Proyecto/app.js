var express = require("express");
var bodyParse = require("body-parser");
var User = require("./models/user").User;

var app = express();

app.set("view engine",  "jade");

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));

	app.get("/",function(req,res) {
		res.render("index");
	});

	app.get("/login",function(req,res){
		res.render("peticion");
	});

	app.get("/register",function(req,res){
		res.render("register");
	});

	app.post("/login",function(req,res){
		var user = new User({nick: req.body.nick, email: req.body.mail, password: req.body.password});

		User.findOne({nick: req.body.nick},function(err,doc){
			if (doc) {
				res.send("Error: El nombre de usuario ya existe");
			}
			else
			{
				user.save(function(){
				res.render("peticion");
				});
			}
		})

		
	});

	app.post("/welcome",function(req,res){

		User.findOne({nick: req.body.nick, password: req.body.password},function(err,doc){
			if (doc) {
				res.send("esta bien");
			}
			else {
				res.send("esta mal");
			}
		});
	});

app.listen(8080);
