function render (html_string,variables,parametros){

  for (var i = variables.length-1; i >= 0; i--) {
    var variable = variables[i]; // Por cada vuelta variable lee el ultimo dato del html en este caso "edad"

    html_string = html_string.replace("{"+variables[i]+"}",parametros[variable]); // y como todo coincide con "edad" lo remplazo
  }
  return html_string;
}

module.exports.render = render;
