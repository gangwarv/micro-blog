const express = require('express'); 
const axios = require('axios') 
const cors = require('cors') 
const app = express(); 

app.use(cors());
app.use(express.json());
 
app.post('/events', (req, res) => {
    const { type, data } = req.body;
    // const { postId, id, content, status } = data;
    if (type == 'CommentCreated') {
        setTimeout(() => { 
            data.content = data.content.replace(/fuck/ig, 'f***k').replace(/shit/ig, 'sh**').replace(/sex/ig, 's*x');
            data.status = 'moderated' 
            axios.post('http://localhost:4005/events', { type:'CommentUpdated', data })
        }, 2000);
    }
    res.send({});
})

app.listen(4003, () => {
    console.log('listening on port 4003')
})