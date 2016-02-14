var http = require("http"),
    fs = require("fs");


    http.createServer(function(req,res){

      if(req.url.indexOf("favicon.ico") > 0) { return;} // Me salteo la carga del favicon

      fs.readFile("./EdadYnombre.html",function(err,html){ // leo mi html

        var html_string = html.toString();
        var variables = html_string.match(/[^\{\}]+(?=\})/g﻿); // Expresiones
        var arreglo_parametros = []; // Aca voy a meter todos los datos ej: ["nombre=nico","edad=15"];
        var parametros = {}; // y aca quedan armados como objetos por dato y valor {nombre: nico, edad: 15}

        if (req.url.indexOf("?") > 0) { // indexOf me devuelve > 0 si encuentra el "?" que indica que hay datos para leer

          var url_data = req.url.split("?"); // hasta aca el array queda ["/","nombre=Nico&edad=15"]

          arreglo_parametros = url_data[1].split("&"); // asi que aca lo divido para que quede ["nombre=nico","edad=15"];
        }

        for (var i = arreglo_parametros.length -1 ; i >= 0 ; i--) {
          var parametro = arreglo_parametros[i]; // Por cada vuelta mete los datos en la var en este caso "edad=15"

          var param_data = parametro.split("="); // los separo para que quede ["edad","15"]

          parametros[param_data[0]] = param_data[1]; // y combino en el hash el dato de posicion 0 con el VALOR de posicion 1
        }

        for (var i = variables.length-1; i >= 0; i--) {
          var variable = variables[i]; // Por cada vuelta variable lee el ultimo dato del html en este caso "edad"

          html_string = html_string.replace("{"+variables[i]+"}",parametros[variable]); // y como todo coincide con "edad" lo remplazo
        }

        res.write(html_string);
        res.end();
      });
    }).listen(8080);
