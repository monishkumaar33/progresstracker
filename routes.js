const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/session', controller.postSession);
router.get('/sessions', controller.getSession);
router.post('/schedule', controller.postSchedule);
router.get('/schedule', controller.getSchedules);
router.delete('/schedule/:day', controller.deleteSchedule);
router.delete('/session/:id', controller.deleteSession);
router.put('/completesession/:id', controller.putSession);

module.exports = router;