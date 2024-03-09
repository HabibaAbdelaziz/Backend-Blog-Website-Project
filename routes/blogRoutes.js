const express = require('express')

//importing from blogController.js
const blogController = require('../controllers/blogController')

const router = express.Router()


//Handling GET requests
router.get('/', blogController.blog_index)

//Handling POST Requests
router.post('/', blogController.blog_create_post)

// GET Create MUST BE before GET blogs/:id (otherwise, browser will try to find blog with id 'create' which will not work bec 'create' is not an id.)
router.get('/create', blogController.blog_create_get )

//When user clicks on a specific blog among the list in homepage, they are redirected to the blog.
router.get('/:id', blogController.blog_details)  

//Deleting a blog based in id
router.delete('/:id', blogController.blog_delete)


//exporting the router
module.exports = router