var http = require("http"),
    fs = require("fs"),
    parser = require("./leeparam.js"),
    renderHtml = require("./renderHtml.js")

    var p = parser.parse;
    var r = renderHtml.render;

    http.createServer(function(req,res){

      if(req.url.indexOf("favicon.ico") > 0) { return;} // Me salteo la carga del favicon

      fs.readFile("./EdadYnombre.html",function(err,html){ // leo mi html

        var html_string = html.toString();
        var variables = html_string.match(/[^\{\}]+(?=\})/g﻿); // Expresiones

        var parametros = p(req);
        html_string = r(html_string,variables,parametros);

        res.write(html_string);
        res.end();
      });
    }).listen(8080);
