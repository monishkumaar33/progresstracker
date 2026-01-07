//track sessions
sessions = [];
schedules = [];
function addSession(session) {
    console.log("Session added: " + session.name);
    sessions.push(session);
}
function removeSession(sessionid) {
    for(sesh of sessions)
    {
        if(sesh.id == sessionid)
        {
            sessions.splice(sessions.indexOf(sesh),1);
            console.log("Session removed: " + sesh.name);
            return;
        }
    }
    console.log("Session with id " + sessionid + " not found.");   
}
function createschedule(schedule) {
    //code to create schedule
    console.log("Schedule created for " + schedule.day);
    schedules.push(schedule);
}
function editsession(session)
{
    sessions = sessions.map(s => s.id === session.id ? session : s);
}
function editschedule(schedule) {
    schedules = schedules.map(s=> s.id==schedule.id?schedule:s);
}
function getsessions() {
    return sessions;
}
sesh1 = {id: 1, name: "DSA", Duration: "60 mins"};
sesh2 = {id: 2, name: "React", Duration: "45 mins"};

schedule = {day: "Monday", sessions: [sesh1, sesh2]};
createschedule(schedule);

addSession(sesh1);
addSession(sesh2);

console.log(getsessions());

module.exports = {addSession, removeSession, createschedule, editsession, editschedule, getsessions};