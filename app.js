const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const blogRoutes = require('./routes/blogRoutes');

//express app
const app = express();

//connect to MongoDB
const dbURI = 'mongodb+srv://adam:123456789Az@node-tuts.92geen0.mongodb.net/?retryWrites=true&w=majority&appName=node-tuts'
mongoose.connect(dbURI , { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));



// register view engine 
app.set('view engine', 'ejs');



// listen for requests
//app.listen(3000);

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // for parsing form data

app.use(morgan('dev'));

// //mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog 3',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     });
//     blog.save()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });
// app.get('/single-blog', (req, res) => {
//     Blog.findById('6877d7a07b79dba4d66037ea')
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });


// app.use((req,res, next) => {
//     console.log('New request made:');
//     console.log('Host:', req.hostname); 
//     console.log('Path:', req.path);
//     console.log('Method:', req.method);
//     next();
// });






app.get('/', (req, res) => {
    res.redirect('/blogs');
    // const blogs = [
    //     { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' },
    //     { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing  elit.' },
    //     { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' }
    // ];
    // //res.send('<p>Home Page</p>');
    // //res.sendFile('./views/index.html', { root: __dirname });
    // res.render('index' , { title: 'Home', blogs });
});

// app.use((req,res, next) => {
//     console.log('in the next middleware:');
    
//     next();
// });


app.get('/about', (req, res) => {
    //res.sendFile('./views/about.html', { root: __dirname });
    //res.send('<p>about Page</p>');
    res.render('about'  , { title: 'About' });
});

// // redirect
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// });

//blogs routes

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
     // Blog.find().sort({ createdAt: 1 }) // for ascending order   
     .then((result) => {
         res.render('index', { title: 'All Blogs', blogs: result });
     })
     .catch((err) => {  
         console.log(err);
     });
});

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        }); 
});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('details', { title: 'Blog Details', blog: result });
        })
        .catch((err) => {
            console.log(err);
        });
}); 

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/blogs/create', (req, res) => {
    res.render('create' , { title: 'Create a Blog' });
});

//blog routes
app.use('/blog', blogRoutes);



// 404 page
app.use((req, res) => { 
    //res.status(404).sendFile('./views/404.html', { root: __dirname });
    res.status(404).render('404' , { title: '404 Not Found' });
});