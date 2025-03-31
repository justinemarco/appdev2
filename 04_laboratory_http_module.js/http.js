const http = require("http")

const port = 3000;
const hostname = "localhost"

const server = http.createServer((req, res) => {
    // console.log(req);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('Hello, Node.js!');  

    if (req.method === "GET") {
        res.end("This is a GET METHOD");
    } else if (req.method === "POST") {
        res.end("This is a POST METHOD");
    } else {
        res.end("Neither GET or POST METHOD, possibly PUT, PATCH, or DELETE method");
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});