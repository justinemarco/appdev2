const http = require("http")
const fs = require("fs")
const path = require('path');
const url = require('url');
const EventEmitter = require('events');
const emitter = new EventEmitter();

const port = 3000;
const hostname = "localhost"

const server = http.createServer((req, res) => {
    // console.log(req);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('Hello, Node.js!');  
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

// CREATE FILE
fs.writeFile('example.txt', 'example', (err) => {
    if (err) {
        console.log(`Error: ${err}`);
    } else {
        console.log(`File successfully created`);
    }

    emitter.on('click', (data) => {
        console.log('A file was created!');
    });

    emitter.emit('click')
});

// READ FILE
fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
    } else {
      console.log('File content:', data);
    }

    emitter.on('click', (data) => {
        console.log('A file was read!');
    });

    emitter.emit('click')
  });

// UPDATE FILE
fs.appendFile('example.txt', '\nThis is an example sentence', (err) => {
    if (err) {
      console.error('Error updating to file:', err);
    } else {
      console.log('File updated successfully!');
    }

    emitter.on('click', (data) => {
        console.log('A file was updated!');
    });

    emitter.emit('click')
  });

// DELETE FILE
fs.unlink('example.txt', (err) => {
    if (err) {
      console.error('Error deleting file:', err);
    } else {
      console.log('File deleted successfully!');
    }

    emitter.on('click', (data) => {
        console.log('A file was deleted!');
    });

    emitter.emit('click')
  });

// PATH MODULE
const fullPath = path.join(__dirname, 'example.txt', 'example.jpg');
console.log(fullPath)

const ext = path.extname(fullPath);
console.log('File extension:', ext);

// URL MODULE
const myUrl = '/delete?filename=example.txt';
// converts into object:
const parsedUrl = url.parse(myUrl, true);


console.log(parsedUrl);
console.log('Query name:', parsedUrl.query.name);

// 