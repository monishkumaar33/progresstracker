//track sessions
let sessions = [];
let schedules = [];
function addSession(session) {
    sessions.push(session);
}
function removeSession(sessionid) {
    for(sesh of sessions)
    {
        if(sesh.id == sessionid)
        {
            sessions.splice(sessions.indexOf(sesh),1);
            return true;
        }
    }
    return false;   
}
function createSchedule(schedule) {
    //code to create schedule
    
    schedules.push(schedule);
}
function removeSchedule(day) {
    for(sch of schedules)
    {   
        if(sch.day == day)
        {
            schedules.splice(schedules.indexOf(sch),1);
            return true;
        }
    }
    return false;
}
function editSession(session)
{
    sessions = sessions.map(s => s.id === session.id ? session : s);
}
function editSchedule(schedule) {
    schedules = schedules.map(s=> s.id==schedule.id?schedule:s);
}
function getSessions() {
    return sessions;
}
function getSchedule()
{
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let today = new Date();
    let day = days[today.getDay()];
   // console.log(day);
    for(let sch of schedules)
    {
        if(sch.day === day)
        {
            return sch.sessions;
        }
    }
    return [];
}



module.exports = {addSession, removeSession, createSchedule, removeSchedule, editSession, editSchedule, getSessions, getSchedule};