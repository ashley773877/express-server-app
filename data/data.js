const users = [
    { id: 1, username: 'Ashley773877' },
    { id: 2, username: 'JohnDoe123' },
  ];
  
  const posts = [
    { id: 1, title: 'Post 1', content: 'This is the content of post 1' },
    { id: 2, title: 'Post 2', content: 'This is the content of post 2' },
  ];
  
  const comments = [
    { id: 1, postId: 1, text: 'Comment on post 1' },
    { id: 2, postId: 1, text: 'Another comment on post 1' },
  ];
  

  const addUser = (user) => {
    users.push(user);
  };
  
  
  module.exports = {
    users,
    posts,
    comments,
  };