// const http = require('http')
// const fs = require('fs')
// const _ = require('lodash')

// //creating a server
// const server = http.createServer((req, res)=>{
//     //lodash
//     const num = _.random(0, 20)
//     console.log(num)

//     //function that only runs once
//     const greet = _.once(()=>{
//         console.log('hello')
//     })

//     greet() //print normally
//     greet() //doesn't print bec it's been printed before (prv line)


//     //set header content type
//     res.setHeader('Content-Type', 'text/html')

//     //You can use Express package instea of using switch statement for large number of webpages, requests and responses
//     //bec the html files are in views folder
//     let path = './views/';
//     switch(req.url){
//         case '/':
//             path += 'index.html'
//             res.statusCode = 200
//             break
//         case '/about':
//             path += 'about.html'
//             res.statusCode = 200
//             break
//         case '/about-blah': //redirecting
//             res.statusCode = 301
//             //We want to redirect the header called Location to /about page
//             res.setHeader('Location', '/about')
//             res.end()
//             break
//         default:
//             path += '404.html'
//             res.statusCode = 404
//             break
//     }

//     //writing whatever content we want to send back to the server
//     // res.write('<head><link rel="stylesheet" href="#"></head>')
//     // res.write('<p>hello, ninjas</p>')
//     // res.write('<p>hello again, ninjas</p>')

//     //send an html file
//     fs.readFile(path, (err, data)=>{
//         if (err){
//             console.log(err)
//             res.end()
//         } else{
//             //res.write(data)
            
//             res.end(data) //can pass data directly to end() if we're only writing one thing not multiple
//         }
//     })

//     //ending the response which then send it to the browser
//     // res.end()

// })

// //invoking listen method
// server.listen(3000, 'localhost', ()=>{
//     console.log('listening for requests on port 3000')
// })