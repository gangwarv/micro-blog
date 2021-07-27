const express = require('express');
const axios = require('axios')
const cors = require('cors')
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    // await axios.post('https://jsonplaceholder.typicode.com/posts', {
    //     title: 'foo',
    //     body: 'bar',
    //     userId: 1,
    // }).then(data=>console.log(data.data))
    res.send('hi from event bus')
})
app.post('/events', async (req, res) => {
    const { type, data } = req.body; 
    axios.post('http://localhost:4000/events', { type, data })
    axios.post('http://localhost:4001/events', { type, data })
    // axios.post('http://localhost:4002/events', { type, data })
    await axios.post('http://localhost:4003/events', { type, data })

    res.status(204).send()
})


app.listen(4005, () => {
    console.log('listening on port 4005')
})