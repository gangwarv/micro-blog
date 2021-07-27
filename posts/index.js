const express = require('express');
const cors = require('cors')
const axios = require('axios')
const { randomBytes } = require('crypto')
const app = express();

const posts = {}

app.use(cors());
app.use(express.json());

app.get('/', (req, res, next) => {
    return res.send("hello world");
});

app.get('/posts', (req, res) => {
    res.send(posts)
})
app.post('/posts', async (req, res) => {
    let id = randomBytes(4).toString('hex');
    let title = req.body.title
    posts[id] = title;

    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
            id,
            title
        }
    })

    res.status(201).send({ id, title })
})

app.post('/events', (req,res)=>{
    const {type,data}=req.body
    console.log(type, 'Event Received')
})

app.listen(4000, () => {
    console.log('listening on port 4000')
})