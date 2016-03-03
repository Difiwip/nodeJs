var express = require("express");
var bodyParse = require("body-parser");
var User = require("./models/user").User;

var app = express();

app.set("view engine",  "jade");

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));

	app.get("/",function(req,res) {
		res.render("index"); // Render del index
	});

	app.get("/login",function(req,res){
		res.render("peticion"); // Render del login
	});

	app.get("/register",function(req,res){
		res.render("register"); // Render para registrarse
	});

	app.post("/login",function(req,res){ // Cuando se crea el usuario mando un post a /login

		var user = new User({nick: req.body.nick, email: req.body.mail, password: req.body.password}); // Meto los datos en la variable user

		User.findOne({nick: req.body.nick},function(err,doc){
			if (doc) {
				res.send("Error: El nombre de usuario ya existe"); // Me fijo si el nombre de usuario existe con los datos que dio el user
			}
			else // Sino lo guardo
			{
				user.save(function(err){
					if (err) {
						console.log(String(err)); // Err se ejecuta cada vez que hay un error de validacion
					}
				res.render("peticion");
				});
			}
		})


	});

	app.post("/welcome",function(req,res){ // El login manda un post a /welcome

		User.findOne({nick: req.body.nick, password: req.body.password},function(err,doc){
			if (doc) {
				res.send("esta bien"); // findOne busca los datos parseados en el login, y si esta el usuario correcto devuelve doc = true
			}
			else { // Si devuelve doc = false es que el user o la password esta mal
				res.send("esta mal");
			}
		});
	});

app.listen(8080);
