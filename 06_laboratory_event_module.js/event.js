const EventEmmitter = require('events');
const emitter = new EventEmmitter();

emitter.on('start', () => {
    console.log("Application Started!");
});

emitter.on('data', (data) => {
    console.log(`Data received: ${data.name}, ${data.age}`);
});

emitter.on('error', (err) => {
    console.error(`Error Occurred: ${err.message}`);
})

emitter.emit('start');
emitter.emit('data', { name: 'John Doe', age: 25 });
emitter.emit('error', { message: 'An error occurred, please try again' });