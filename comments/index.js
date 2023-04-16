const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const commentsByPostId = {};  // object where we'll store our comments

app.get('/posts/:id/comments', (req, res) => {      // for each post we'll get its id and associate the respective comments
  res.send(commentsByPostId[req.params.id] || []);  // lookup inside comment object for id provided by request and provide the comments
});

app.post('/posts/:id/comments', (req, res) => {           // creating a comment
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || []; // do we already have a comment associated with the respective post, if not provide empty array

  comments.push({ id: commentId, content });

  commentsByPostId[req.params.id] = comments; // assign the comment to the post

  res.status(201).send(comments); // send back the entire array of comments
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});