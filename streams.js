const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    // solution 1
    // this is not acceptable  for a scalable solution
    // fs.readFile('./test-file.txt', (err, data) => {
    //     if (err) console.log(err);
    //     res.end(data);
    // });

    // solution 2
    // the problem with this approach is that the readable stream, the one we are using to read the files form the disk is much faster than actually sending the result with the response writable stream over the network. This is called Back-pressure. Back pressure is when the response cant send the data nearly as fast as it is receiving it.
    // const readable = fs.createReadStream('test-file.txt');
    // readable.on('data', (chunk) => {
    //     res.write(chunk);
    // });
    // readable.on('end', () => {
    //     res.end();
    // });
    // readable.on('error', (err) => {
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end('file not found');
    // });

    // solution 3
    // using the pipe function allows the app to automatically control the speed of which the data flows in and out to and from th read and wirte streams
    const readable = fs.createReadStream('test-file.txt');
    readable.pipe(res);
    readable.on('error', (err) => {
        console.log(err);
        res.statusCode = 500;
        res.end('file not found');
    });
});

server.listen(3000, '127.0.0.1', () => {
    console.log('now listening');
});