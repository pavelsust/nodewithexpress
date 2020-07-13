const mongoose = require('mongoose');
const logger = require('node-color-log');
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const Author = mongoose.model('Author', new mongoose.Schema({
    name: String,
    bio: String,
    website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    category:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }
}));

const Category = mongoose.model('Category' , new mongoose.Schema({
    name:String,
}))

async function createCategory(name){
    const category = new Category({
        name:name
    })
    const result =await category.save()
    logger.info(result)
}

async function createAuthor(name, bio, website) {
    const author = new Author({
        name,
        bio,
        website
    });

    const result = await author.save();
    logger.info(result)
}

async function createCourse(name, author , category) {
    const course = new Course({
        name,
        author,
        category
    });

    const result = await course.save();
    logger.info(result);
}

async function listCourses() {
    const courses = await Course
        .find()
        .populate('author', 'name -_id website')
        .populate('category', 'name -_id')
        //.select('name author');
    logger.info(courses);
}

//createAuthor('Mosh', 'My bio', 'My Website');
//createCategory('android')

//createCourse('Node Course', '5f0c46dcd0f78818278f72ed' , '5f0c46e2e5ec1b182fb40a3d')

listCourses();