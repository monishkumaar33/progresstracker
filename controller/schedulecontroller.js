
const { addSession, 
    getSessions, 
    createSchedule, 
    getSchedule, 
    removeSchedule, 
    removeSession,
    completeSession } = require('../service/scheduleservice');


exports.postSession =  async (req, res) => {
    const receivedData = req.body;
    try{
    const session = await addSession(receivedData);
    return res.status(201).json('Data received and session added.',session);
    } catch (error) {
        return res.status(500).send('Error adding session: ' + error.message);
    }
    
}

exports.getSession = async(req,res)=>
{
    const sessions = await getSessions();
    if(sessions.length === 0)
    {
        return res.status(200).json({message: "No sessions available."});
    }
    return res.status(200).json(sessions);
}

exports.getSchedules = async (req,res)=>
{
    const schedule = await getSchedule();
    if(schedule.length===0)
    {
        return res.status(200).json({message: "No schedule available."});
    }
    return res.status(200).json(schedule);

}

exports.postSchedule = async (req,res)=>
{
    const receivedData = req.body;
    await createSchedule(receivedData);
    return res.status(201).send("Schedule created.");
}

exports.deleteSchedule = async (req,res)=>
{
    const day = req.params.day;
    if(await removeSchedule(day))
    {
        return res.status(200).send("Schedule removed for " + day);
    }
    return res.status(404).send("Schedule for day " + day + " not found.");
}

exports.deleteSession =async(req,res)=>
{
    const seshid = req.params.id;
    if(await removeSession(seshid))
    {
        return res.status(200).send("Session removed.");
    }
    return res.status(404).send("Session not found.");
}

exports.putSession = async(req, res) => {
    const seshid = req.params.id;
    if(await completeSession(seshid)) {
        return res.status(200).send('Session marked as completed.');
    }
    return res.status(404).send("Session not found");
}

