const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();

// this is how you change the treadpool size
process.env.UV_THREADPOOL_SIZE = 10;

setTimeout(() => console.log('Timer 1 finished'), 0);
setImmediate(() => console.log('Immediate 1 finished'));

fs.readFile(__dirname + '/test-file.txt', () => {
    console.log('I/O finished');

    setTimeout(() => console.log('Timer 2 finished'), 0);
    setTimeout(() => console.log('Timer 3 finished'), 3000);
    // setImmediate is a misleading name
    setImmediate(() => console.log('Immediate 2 finished'));

    // nextTick is a misleading name. This and setImmediate should be switched around.
    process.nextTick(()=>console.log('process.nextTick()'));

    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start,' - Password Encrypted');
    });
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start,' - Password Encrypted');
    });
});

console.log('hello from the top level code');