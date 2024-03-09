const mongoose  = require('mongoose')
const Schema = mongoose.Schema // Schema in mongoose.Schema is a constructor func.

// Adding the diff items we want our blogs to have
const blogSchema = new Schema({
    title: {
        type: String,
        required: true //meaning: the title object is a must and has type string
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true}) //We pass timestamps to true as 2nd arg to auto assign values to the above properties

//Model
//name of model is important bec its how we communicate with db in the future
const Blog = mongoose.model('Blog', blogSchema) //2nd arg is the schema we want to base this model on. (the one we created above)
// first arg should be singular form of what we want to store. In this case, it's 'Blog'

//exporting the model to use it elsewhere in the project
module.exports = Blog



