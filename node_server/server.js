var http = require('http');
var formidable = require('formidable');
var util = require('util');

http.createServer(function (request, response) {
    console.log('request starting...');

    response.setHeader('Access-Control-Allow-Origin','*');
    response.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With,Content-Type,Accept');

    if(request.method.toLowerCase() == 'post')  {
        processForm(request,response);
        return;
    }

    if(request.method.toLowerCase() == 'get')  {
        var data = {
            data : {
                languages : ['English','Hindi', 'Marathi', 'Telegu', 'German']

            }
        };

        var respon = JSON.stringify(data);
        response.end(respon);
        console.log('get', respon);
        return;
    }

    response.end();
}).listen(3100);


function processForm(request, response){
  var form = new formidable.IncomingForm();

  form.parse(request, function(err, fields){

        fields.id = '1234';
        response.writeHead(200,{
            'content-type': 'text/plain'
        });

        var data = JSON.stringify({
            fields : fields
        });

        response.end(data);

        console.log('posted fields:\n');

        console.log(data);
  });


}

console.log('Server running at http://127.0.0.1:3100/');