//var fs = require('fs')
var ws = require("nodejs-websocket")
var connections = 0;


function isValidJson(text){
	if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
	replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
	replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
		return true;
	}
	return false;
}

var options = {
	secure: false
}

//Creating the server..
var server = ws.createServer(options, function (conn) {
    connections++;
    var id = connections;
	console.log(connections);
    conn.on("text", function (str) {
		if(isValidJson(str)){
			console.log(JSON.parse(str));
		}else{
			console.log("Geen valide JSON: "+ str);
		}
		
	});
	
	conn.on("error", function (code, reason) {
		//Connectie is gesloten
		console.log(reason);
    });

    conn.on("close", function (code, reason) {
		//Connectie is gesloten
    });

}).listen(4141)

function broadcast(server, msg) {
    server.connections.forEach(function (conn) {
        conn.sendText(msg)
    })
}