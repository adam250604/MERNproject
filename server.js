const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {


    // //lodash
    // const num = _.random(0, 20);
    // console.log(num);
    // const greet = _.once(() => {
    //     console.log('Hello');
    // });
    // greet();    
    // greet(); // will not log 'Hello' again




    //set header content type
res.setHeader('Content-Type', 'text/html');

let path = './views/';
switch(req.url) {
    case '/':
        path += 'index.html';
        res.statusCode = 200; 
        break;
    case '/about':
        path += 'about.html';
        res.statusCode = 200; 
        break;
    case '/about-us':
        res.statusCode = 301; 
        res.setHeader('Location', '/about'); 
        res.end(); 
        return; 
    default:
        path += '404.html';
        res.statusCode = 404;
        break;
}


    //send an html file
    fs.readFile(path, (err, data) => {

        if (err) {
            console.log(err);
            res.end();
        } else {
            //res.write(data);
            // set status code to 200 OK

            res.end(data);  
        }
    });
}); 











server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
});     



//     res.write('<head><link rel="stylesheet" href="#"></head>');
//     res.write('<p>Hello, World!</p>');
//     res.write('<p>Welcome to my server!</p>');
//     res.end();
// });
