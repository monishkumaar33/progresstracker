//track sessions
const pool = require('./db');

sessions = [];
schedules = [];

async function addSession(session) {
    await pool.query("INSERT INTO sessions(title, description , completed) values($1,$2,$3)",
        [session.title,session.description,session.completed]);
}
async function removeSession(sessionid) {
    const res =await pool.query("DELETE from sessions where id=$1",[sessionid]);
    return res.rowCount > 0;

}
async function createSchedule(day, sessionsList) {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");
        const res = await client.query(
            "INSERT INTO schedules(day) VALUES ($1) RETURNING id",
            [day]
        );
        const scheduleId = res.rows[0].id;

        
        await client.query(
            `INSERT INTO schedule_session (schedule_id, session_id)
             SELECT $1, id
             FROM sessions
             WHERE id = ANY($2::int[])`,
            [scheduleId, sessionsList]
        );

        await client.query("COMMIT");
    } catch (error) {
        await client.query("ROLLBACK");
        throw error; // VERY important
    } finally {
        client.release();
    }
}

async function removeSchedule(day) {
    const res = await pool.query("DELETE from schedules where day=$1",[day]);
    return res.rowCount > 0;
}
async function editSession(session)
{
    const res = await pool.query("UPDATE sessions set title=$1, description=$2, completed=$3 where id=$4",
                                    [session.title, session.description, session.completed, session.id]);
}
function editSchedule(schedule) {
    schedules = schedules.map(s=> s.id==schedule.id?schedule:s);
}
async function getSessions() {
    
    const res = await pool.query("SELECT * from sessions");
    return res.rows;
}
async function getSchedule()
{
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let today = new Date().getDay();
    const res = await pool.query(
        "select s.* from sessions s join schedule_session ss on s.id = ss.session_id join schedules sch on ss.schedule_id = sch.id where sch.day = $1",
        [days[today]]);
    return res.rows;
}
async function completeSession(sessionid)
{
    const res = await pool.query("UPDATE sessions set completed=true where id = $1",[sessionid]);
    return res.rowCount > 0;
}


module.exports = {addSession, removeSession, createSchedule, removeSchedule, editSession, editSchedule, getSessions, getSchedule,completeSession};