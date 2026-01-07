const express = require('express');
const { addSession, getsessions } = require('./practice');
const { get } = require('http');
const app = express();
app.use(express.json());

app.post('/data', (req, res) => {
    const receivedData = req.body;
    addSession(receivedData);
    //console.log(getsessions());
    res.status(201).send('Data received and session added.');
});
app.get('/data', (req,res)=>
{
    res.status(200).json(getsessions());
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});