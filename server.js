let http = require('http'),
    fs = require('fs');

fs.readFile('./public/index.html', function (err, html) {
  if (err) {
    throw err;
  }

  let server = http.createServer(function(request, response){
    response.writeHead(200);
    response.write(html);
    
    response.end();
  })

  server.listen(8080);
  console.log('Addresse: http://localhost:8080')
})

fs.writeFile('./test.txt', '{test: "My test"}', function(err, file){
  console.log(err);
  console.log(file);
})
