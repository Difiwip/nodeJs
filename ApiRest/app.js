var express = require("express"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override");
    User = require("./models/user").User;

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

router.use(function(req,res,next){
  console.log("Request a la api");
  next();
});


router.get("/",function(req,res){
  res.send("hola");
});

router.route("/users")
  .post(function(req,res){
    var user = new User();
        user.nick = req.body.nick;
        user.email = req.body.email;
        user.password = req.body.password;

        user.save(function(err){
          if (err) {
            res.send("Error al crear usuario: " + err);
          }
          res.send("Usuario creado con exito");
        });
  })
  .get(function(req,res){
    User.find(function(err,doc){
      if(err) res.send(err);
      res.json(doc);
    });
  });

router.route("/users/:id")

  .get(function(req,res){
    User.findById(req.params.id,function(err,doc){
      if(err) console.log(err);;
      res.json(doc);
      })
    })

    .put(function(req,res){
      User.findById(req.params.id,function(err,user){

            user.nick = req.body.nick;
            user.email = req.body.email;
            user.password = req.body.password;

            user.save(function(err){
              if (err) {
                res.send("Error al actualizar el  usuario: " + err);
              }
              res.send("Usuario actualizado con exito");
            });
      });
    });



app.use(router);

app.listen(8080);
