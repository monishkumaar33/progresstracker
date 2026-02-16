const express = require('express');
const router = express.Router();

const scheduleController = require('./controller/schedulecontroller');
const authenticate = require('./middleware/auth');
const { validateSession, validateSchedule, validateParamId } = require('./middleware/validators');

router.use(authenticate)

router.post('/session', validateSession, scheduleController.postSession);
router.get('/sessions', scheduleController.getSession);
router.post('/schedule', validateSchedule, scheduleController.postSchedule);
router.get('/schedule', scheduleController.getSchedules);
router.delete('/schedule/:day', scheduleController.deleteSchedule);
router.delete('/session/:id', validateParamId('id'), scheduleController.deleteSession);
router.put('/completesession/:id', validateParamId('id'), scheduleController.putSession);

module.exports = router;
