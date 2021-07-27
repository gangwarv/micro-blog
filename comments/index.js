const express = require('express');
const cors = require('cors')
const axios = require('axios')
const { randomBytes } = require('crypto')
const app = express();

const commentsByPostId = {}

app.use(cors());
app.use(express.json());

app.get('/posts/:id/comments', (req, res, next) => {
    return res.send(commentsByPostId[req.params.id]||[]);
});

app.post('/posts/:id/comments', async (req, res) => {
    let id = randomBytes(4).toString('hex');
    let postId = req.params.id;
    let content = req.body.content;
    const comment = {
        id,
        postId,
        content,
        status: 'pending'
    }
    const comments = commentsByPostId[postId] || [];
    comments.push(comment);

    commentsByPostId[postId] = comments;

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: comment
    })

    res.status(201).send(comment)
})

app.post('/events', (req, res) => {
    const { type, data } = req.body;
    const { postId, id, status, content } = data;
    if (type == 'CommentUpdated') { 
        commentsByPostId[postId].forEach(comment => {
            if (comment.id == id){
                comment.status = status
                comment.content = content
            }
                
        });
    }
})

app.listen(4001, () => {
    console.log('listening on port 4001')
})