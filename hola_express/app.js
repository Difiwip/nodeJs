var express = require("express");

var app = express();

app.set("view engine","jade");

app.get("/",function(req,res){
  res.render("index");
});

app.get("/:nombre",function(req,res){
  res.render("nico",{nombre: req.params.nombre});
})


app.listen(8080);
