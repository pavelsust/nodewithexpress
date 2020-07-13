const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    authors: [authorSchema]
}));

async function createCourse(name, authors) {
    const course = new Course({
        name,
        authors
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course.find();
    console.log(courses);
}

// createCourse('Node Course', [new Author({name: 'Mosh 1'}),
//     new Author({name: 'Mosh 2'}),
//     new Author({name: 'Mosh 3'})]);

//updateAuthor('5f0c4e290793221a2f602746')
async function updateAuthor(courseId) {
    // let course = await Course.findById(courseId)
    // course.author.name = 'Masud Parvez'
    // course.save()

    let course = await Course.update({_id: courseId}, {
        $set: {
            'author.name': 'John Smith 2'
        }
    })

    //course.save()
}

async function addAuthor(courseID , author){
    let course = await Course.findById(courseID)
    course.authors.push(author)
    course.save()
}


async function removeAuthor(courseID , authorID){
    let course = Course.findById(courseID)
    let author = course.authors.id(authorID)
    author.remove()
    course.save()
}

//removeAuthor('5f0c510be723f21b831cc509' , '5f0c5300f27ff41c5ae4eb93')

//addAuthor('5f0c510be723f21b831cc509' , new Author({name: 'pavel'}))