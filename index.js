const express = require('express');
const data = require('./data/data');
const ejs = require('ejs');


const app = express();
const PORT = 3000;

//middlewear 2
const authenticationMiddleware = (req, res, next) => {
    const validUsername = 'Ashley773877';
    const validPassword = 'ashley123';
  
    const providedUsername = req.headers['username'];
    const providedPassword = req.headers['password'];
    
    if (providedUsername === validUsername && providedPassword === validPassword) {
        next(); // User is authenticated
      } else {
        res.status(401).send('Unauthorized'); // Invalid credentials
      }
    };

//middlewear 
const loggerMiddleware = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
  };

  app.set('view engine', 'ejs');

//error handling middlewear
 app.use((err, req, res, next) => {
    // Handle the error
    res.status(err.status || 404).json({
      error: {
        message: err.message || 'Server Error',
      },
    });
  });

  app.use(loggerMiddleware);
  app.use(express.static('styles'));

  //restful route
app.route('/users')
.get((req, res) => {
 res.render('users', { users: data.users });
});



app.use('/posts', authenticationMiddleware);
app.use('/comments', authenticationMiddleware);

 
//routes
//POST route for creating a new user
app.post('/users', (req, res) => {
    const newUser = {
      id: data.users.length + 1,
      username: req.body.username,
    };
    data.addUser(newUser);
    res.redirect('/users'); // Redirect back to the user list after creating a new user
  });


  app.get('/', (req, res) => {
    res.send('Hello, this is your Express server!');
  });

app.route('/users')
  .get((req, res) => {
    res.json(data.users);
  })
  .post((req, res) => {
    const newUser = {
      id: data.users.length + 1,
      username: req.body.username,
    };
    data.addUser(newUser);
    res.json(newUser);
  })
  .put((req, res) => {
    const userId = parseInt(req.params.id);
    const updatedUser = req.body;
     const userIndex = data.users.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
     data.users[userIndex] = {
        ...data.users[userIndex],
        updatedUser,
      };

      res.json(data.users[userIndex]);
    } else {
    const err = new Error('User not found');
      err.status = 404;
      next(err);
    }
  })
  .delete((req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = data.users.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
     const deletedUser = data.users.splice(userIndex, 1)[0];
      res.json(deletedUser);
    } else {
        const err = new Error('User not found');
      err.status = 404;
      next(err);
    }
  });
  
  //route parmameter
  app.route('/users/:id')
  .get((req, res) => {
    const userId = parseInt(req.params.id);
    const user = data.users.find(user => user.id === userId);

    if (user) {
      res.json(user);
    } else {
    const err = new Error('User not found');
      err.status = 404;
      next(err);
    }
  });

  app.route('/posts')
  .get((req, res) => {
   const { userId } = req.query;

    if (userId) {
      const filteredPosts = data.posts.filter(post => post.userId === parseInt(userId));
      res.json(filteredPosts);
    } else {
      
      res.json(data.posts);
    }
  })
  .post((req, res) => {
    const newPost = {
      id: data.posts.length + 1,
      title: req.body.title,
      content: req.body.content,
    };
    data.posts.push(newPost);
    res.json(newPost);
  })
  .put((req, res) => {
    const postsId = parseInt(req.params.id);
    const updatedPosts = req.body;
     const postsIndex = data.posts.findIndex(posts => posts.id === postsId);

    if (postsIndex !== -1) {
     data.posts[postsIndex] = {
        ...data.posts[postsIndex],
        updatedPosts,
      };

      res.json(data.posts[postsIndex]);
    } else {
    const err = new Error('User not found');
      err.status = 404;
      next(err);
    }
  })
  .delete((req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = data.posts.findIndex(post => post.id === postId);

    if (postIndex !== -1) {
     const deletedPost = data.posts.splice(postIndex, 1)[0];
      res.json(deletedPost);
    } else {
     const err = new Error('Post not found');
      err.status = 404;
      next(err);
    }
  });
 


app.route('/comments')
  .get((req, res) => {
    res.json(data.comments);
  })
  .post((req, res) => {
    const newComment = {
      id: data.comments.length + 1,
      postId: req.body.postId,
      text: req.body.text,
    };
    data.comments.push(newComment);
    res.json(newComment);
  })
  .put((req, res) => {
    const commentsId = parseInt(req.params.id);
    const updatedComments = req.body;
     const commentsIndex = data.comments.findIndex(comments => data.comments.id === commentsIdId);

    if (commentsIndex !== -1) {
     data.comments[commentsIndex] = {
        ...data.comments[commentsIndex],
        updatedComments,
      };

      res.json(data.comments[commentsIndex]);
    } else {
    const err = new Error('User not found');
      err.status = 404;
      next(err);
    }
  })
  .delete((req, res) => {
    const commentId = parseInt(req.params.id);
    const commentIndex = data.comments.findIndex(comment => comment.id === commentId);

    if (commentIndex !== -1) {
     const deletedComment = data.comments.splice(commentIndex, 1)[0];
      res.json(deletedComment);
    } else {
     const err = new Error('Comment not found');
      err.status = 404;
      next(err);
    }
  });
 
  
  




app.listen(PORT, () => {
console.log(`Server is running on port: ${PORT}`);

});



