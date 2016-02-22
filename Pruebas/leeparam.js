function parse(req){

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

  return parametros;
}

module.exports.parse = parse;
