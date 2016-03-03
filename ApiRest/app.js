var express = require("express"),
    bodyParser = require("body-parser"),
    User = require("./models/user").User;

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router(); // Declaro la ruta

router.use(function(req,res,next){
  console.log("Request a la api");
  next();
});


router.route("/users") // En la ruta /Users abajo declaro los verbos y lo que va a pasar

  .post(function(req,res){ // En el verbo http POST tengo que crear un nuevo users

    var user = new User();
        user.nick = req.body.nick;
        user.email = req.body.email;
        user.password = req.body.password; // hago los parseos de todo

        user.save(function(err){ // Lo guardo
          if (err) {
            res.send("Error al crear usuario: " + err); // Si hay error me putea
          }
          res.send("Usuario creado con exito");
        });
  })

  .get(function(req,res){ // Verbo get me muestra todos los users guardados
    User.find(function(err,doc){ // El documento se guarda en el segundo parametro doc
      if(err) res.send(err); // Si hay error me putea
      res.json(doc);// Lo muestro como json
    });
  });

router.route("/users/:id") // Ahora a la ruta /users pero con una id especifica

  .get(function(req,res){ // Igual que el get anterior solo que ahora en findById le paso la id del user que quiero mostrar
    User.findById(req.params.id,function(err,user){ // Lo guardo en user
      if(err) console.log(err);;
      res.json(user); // lo muestro
      })
    })

    .put(function(req,res){

      User.findById(req.params.id,function(err,user){ // Encuentro el user con el id, y lo vuelvo a guardar en el segundo parametro "user"

            user.nick = req.body.nick;
            user.email = req.body.email;
            user.password = req.body.password; // Una vez localizado actualizo los datos

            user.save(function(err){
              if (err) {
                res.send("Error al actualizar el  usuario: " + err); // Error
              }
              res.send("Usuario actualizado con exito"); // tanan!!
            });
      });
    });


app.use(router);

app.listen(8080);
