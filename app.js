//PLEASE INSTALL node_modules BEFORE RUNNING CODE.
//Remeber, code runs from top to bottom. That is why 404 code is places at the bottom.
//Once a response is sent, the rest of code is not executed.

const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const blogRoutes = require('./routes/blogRoutes') //importing router form blogRoutes.js


// express app
const app = express();


//connect to mongodb
//PLEASE INSERT YOUR MONGODB DATABASE URL BELOW
const dbURL = 'mongodb+srv://********.mongodb.net/'
//async tasks so it returns a promise
mongoose.connect(dbURL)
    .then((result) => app.listen(3000) /* listen for requests only when connecting to database was successful.*/ )
    .catch((err) => console.log(err))



//register view engine if your html is inside views folder, do the below
app.set('view engine', 'ejs')

// if html is in another folder (not views), do this.
//app.set('views', 'myviews')







// middleware & static files (morgan and static)

//We created a folder called oublic in our dir and moved styles.css there.
//With the below line of code (static()), we can now use styles.css after linking it in our head.esj
app.use(express.static('public'))
//Passes the blog content newly writen by the user to an object which will then be used in the POST code below
app.use(express.urlencoded({extended: true}))
//Morgan is a HTTP request logger middleware for Node. js.
//It simplifies the process of logging requests to your application.
app.use(morgan('dev'))

/*

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about  my new blog',
        body: 'more about my blog'        
    })

    //saving the above blog entry data to the db (async task which returns a promise)
    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

//Retrieves all blogs from the db and sends it to the browser
app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

//Finding a single blog from our db using its id
app.get('/single-blog', (req, res) => {
    Blog.findById('65e8691cbb3a6d46b953bd0f')
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})




app.use((req, res, next) => {
    // console.log('new request made:');
    // console.log('host: ', req.hostname);
    // console.log('path: ', req.path);
    // console.log('method: ', req.method);
    // //After the server send the use() method, it hangs bec it doesn't know what to do next.
    //To solve this issue, we use next().

    next();
  });



//   app.use((req, res, next) => {
//     console.log('in the next middleware');
//     next();
//   });


*/

//routes

app.get('/', (req, res) => {
    //res.send('<p>home page</p>');
    // sendFile uses the absolute path. To use relative path, you must specifiy the root path in second argu
    //res.sendFile('./views/index.html', { root: __dirname})

    //redirecting to app.get('/blogs') (which can be found a few lines below) when user goes to homepage
    res.redirect('/blogs')
});

app.get('/about', (req, res) => {
    //res.send('<p>about page</p>');
    //res.sendFile('./views/about.html', { root: __dirname})

    //rendering a view
    res.render('about', { title: 'About' })

});


//Blog Routes

//using imported routes from blogRoutes.js
//It applies all router handlers in blogRoutes.js to app handler here
//If we include '/blogs' here, then we can just put '/' as first arguments in blogRoutes.js instead of repeating '/blogs' for each GET.
app.use('/blogs', blogRoutes) 




// //redirects
// //If user types /about-us in the search bar, they are redirected to /about page
// app.get('/about-us', (req, res)=>{
//    // res.sendFile('./views/about.html', { root: __dirname})

//    res.redirect('/about')
// })



//404 page (code for 404 must come at the end of the file)
app.use((req, res)=>{
    //res.status(404).sendFile('./views/404.html', { root: __dirname})


    //rendering a view
    res.status(404).render('404', { title: '404' })
})
