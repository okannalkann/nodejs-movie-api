const http = require('http');

const server = http.createServer((request, response) => {
    response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });

    if(request.method == "GET"){
        if(request.url === '/')
            response.write("index sayfası");
        else if (request.url === '/iletisim')
            response.write('iletisim sayfasi');
        else
            response.write('sayfa bulunamadi');
    }

    response.end();
});

server.listen(3000);