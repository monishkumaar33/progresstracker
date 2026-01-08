const express = require('express');
const { addSession, getSessions, createSchedule, getSchedule, removeSchedule, removeSession } = require('./practice');
const app = express();
app.use(express.json());

app.post('/session', (req, res) => {
    const receivedData = req.body;
    addSession(receivedData);
    
    res.status(201).send('Data received and session added.');
});
app.get('/sessions', (req,res)=>
{
    res.status(200).json(getSessions());
});
app.get("/schedule",(req,res)=>
{
    const schedule = getSchedule();
    if(schedule.length === 0)
        {
            return res.status(200).json({message: "No sessions scheduled today."});
        }
    return res.status(200).json(schedule);
});
app.post("/schedule",(req,res)=>
{
    const data = req.body;
    createSchedule(data);
    res.status(201).send("Schedule created.");
});
app.delete("/schedule/:day",(req,res)=>
{
    const day = req.params.day;
    if(removeSchedule(day))
    {
        return res.status(200).send("Schedule removed for " + day);
    }
    return res.status(404).send("Schedule for day " + day + " not found.");
});
app.delete("/session/:id",(req,res)=>
{
    const seshid = req.params.id;
    if(removeSession(seshid))
    {
        return res.status(200).send("Session removed.");
    }
    return res.status(404).send("Session not found.");
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});