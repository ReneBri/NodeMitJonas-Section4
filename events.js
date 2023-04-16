const EventEmitter = require('events');
const http = require('http');

const myEmitter = new EventEmitter();

// observers
myEmitter.on('newSale', () => {
    console.log('there was a new sale');
});

myEmitter.on('newSale', () => {
    console.log('something else');
});

myEmitter.on('newSale', stock => {
    console.log(`There are now ${stock} items left in stock.`)
});

// emitter
myEmitter.emit('newSale', 9);

////////////////////////////////////////////////////////////////

// HTTP event examples

const server = http.createServer();

server.on('request', (req, res) => {
    console.log('req received');
    res.end('req received');
});

server.on('request', (req, res) => {
    console.log('Whats up?');
});

server.on('close', () => {
    console.log('Server closed');
});

server.listen(3000, '127.0.0.1', () => {
    console.log('now listening on port 3000');
});