const Blog = require('../models/blog') // We used '..' because we first need to come out of the routes folder (current folder) before going to modules folder


// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete



const blog_index = (req, res) => {
    //getting all the blogs
    Blog.find().sort({ createdAt: -1}) //sorting by a specific field (desc order of time created)
        .then((result) => {
            res.render('blogs/index', { title: 'All Blogs', blogs: result})
        })
        .catch((err) => {
            console.log(err)
        })
}


const blog_details = (req, res) => {
    //Extracting id from the request object
    const id = req.params.id //"id" var here MUST match the "id" var in the first arg of the current router.get func we are in. You can name it anything else, but the two must match. 
    
    //Finding/Retrieving a single document (collection) within the db using the id in link clicked by user.
    Blog.findById(id)
    .then(result => {
        res.render('blogs/details', {blog: result, title: 'Blog Details'})
    })
    .catch(err => {
        res.status(404).render('404', {title: 'Blog Not Found.'})
    })
}


const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create a New Blog'})
}

const blog_create_post = (req, res) => {
    //To get the blog contents newly entered by the user
    //Don't forget to add "router.use(express.urlencoded({extended: true}))" in the beg of this file
    
    //creating a new instance of the blog and assigning the newly written blog by user to it
    const blog = new Blog(req.body)

    //Saving it to the database (async)
    blog.save()
        .then((result) => {
            //Redirecting user to homepage to see their newly added blog after clicking submit.
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err)
        })
}


const blog_delete = (req, res) => {
    const id = req.params.id

    Blog.findByIdAndDelete(id)
        //Since we used js to handle the delete methond in details.ejs, we cannot redirect inside .then.
        //We can only return a json obj or text data back to the browser. That json or text data will have a redirect property.
        .then(result => {
            //After finding the blog with the correct id and deleting it, browser is redirected to '/blogs'
            res.json({ redirect: '/blogs'})
        })
        .catch(err => {
            console.log(err)
        })
}


module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}