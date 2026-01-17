const express = require('express');
const { addSession, 
    getSessions, 
    createSchedule, 
    getSchedule, 
    removeSchedule, 
    removeSession,
    completeSession } = require('./practice');
const pool = require('./db');

const app = express();
app.use(express.json());

app.post('/session', async (req, res) => {
    const receivedData = req.body;
    try{
    const session = await addSession(receivedData);
    return res.status(201).json('Data received and session added.',session);
    } catch (error) {
        return res.status(500).send('Error adding session: ' + error.message);
    }
    
});
app.get('/sessions', async(req,res)=>
{
    const sessions = await getSessions();
    if(sessions.length === 0)
    {
        return res.status(200).json({message: "No sessions available."});
    }
    return res.status(200).json(sessions);
});
app.get("/schedule",async(req,res)=>
{
    const schedule = await getSchedule();
    if(schedule.length===0)
    {
        return res.status(200).json({message: "No schedule available."});
    }
    return res.status(200).json(schedule);

});
app.post("/schedule",async (req,res)=>
{
    const receivedData = req.body;
    await createSchedule(receivedData);
    return res.status(201).send("Schedule created.");
});
app.delete("/schedule/:day",async (req,res)=>
{
    const day = req.params.day;
    if(await removeSchedule(day))
    {
        return res.status(200).send("Schedule removed for " + day);
    }
    return res.status(404).send("Schedule for day " + day + " not found.");
});
app.delete("/session/:id",async(req,res)=>
{
    const seshid = req.params.id;
    if(await removeSession(seshid))
    {
        return res.status(200).send("Session removed.");
    }
    return res.status(404).send("Session not found.");
});
app.post('/completesession/:id', async(req, res) => {
    const seshid = req.params.id;
    if(await completeSession(seshid)) {
        return res.status(200).send('Session marked as completed.');
    }
    return res.status(404).send("Session not found");
});

// Test database connection before starting server
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        console.error('Check your .env file and database connection settings.');
    } else {
        console.log('Database connected successfully');
    }
});

const server = app.listen(3000, () => {
    console.log(`Server is running on 3000`);
});

// Global error handlers
server.on('error', (err) => {
    console.error('Server error:', err);
    process.exit(1);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});