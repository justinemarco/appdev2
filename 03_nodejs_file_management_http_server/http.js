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
    if (req.url.startsWith('/delete')) {
        const parsedUrl = url.parse(req.url, true);
        // const filename = parsedUrl.query.filename;
        const filename = 'http://localhost:3000/select?filename=example.txt';

        if (filename) {
            fs.unlink(filename, (err) => {
                if (err) {
                    res.statusCode = 500;
                    res.end(`Error deleting file: ${err.message}`);
                } else {
                    res.statusCode = 200;
                    res.end(`File ${filename} deleted successfully.`);
                }
            });
        } else {
            res.statusCode = 400;
            res.end('Filename query parameter is required.');
        }
    } else {
        res.end('Hello, Node.js!');  
    }

    console.log(parsedUrl);
    console.log('Query name:', parsedUrl.query.name);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

// CREATE FILE
const writeFileAsync = (filename, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, data, (err) => {
            if (err) {
                reject(`Error: ${err}`);
            } else {
                resolve(`File successfully created`);
            }
        });
    });
};

    writeFileAsync('example.txt', 'example')
        .then(message => console.log(message))
        .catch(err => console.log(err));

    emitter.on('click', (data) => {
        console.log('A file was created!');
    });

    emitter.emit('click');


// READ FILE
const readFileAsync = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                reject('Error reading file:', err);
            } else {
                resolve(data);
            }
        });
    });
};

    readFileAsync('example.txt')
        .then(data => console.log('File content:', data))
        .catch(err => console.error(err));

    emitter.on('click', (data) => {
        console.log('A file was read!');
    });

    emitter.emit('click');


// UPDATE FILE
const appendFileAsync = (filename, data) => {
    return new Promise((resolve, reject) => {
        fs.appendFile(filename, data, (err) => {
            if (err) {
                reject('Error updating to file:', err);
            } else {
                resolve('File updated successfully!');
            }
        });
    });
};

    appendFileAsync('example.txt', '\nThis is an example sentence')
        .then(message => console.log(message))
        .catch(err => console.error(err));

    emitter.on('click', (data) => {
        console.log('A file was updated!');
    });

    emitter.emit('click');

// DELETE FILE
const deleteFileAsync = (filename) => {
    return new Promise((resolve, reject) => {
        fs.unlink(filename, (err) => {
            if (err) {
                reject('Error deleting file:', err);
            } else {
                resolve('File deleted successfully!');
            }
        });
    });
};

    deleteFileAsync('example.txt')
        .then(message => console.log(message))
        .catch(err => console.error(err));

    emitter.on('click', (data) => {
        console.log('A file was deleted!');
    });

    emitter.emit('click');

// PATH MODULE
const fullPath = path.join(__dirname, 'example.txt', 'example.jpg');
console.log(fullPath)

const ext = path.extname(fullPath);
console.log('File extension:', ext);