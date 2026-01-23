const express = require('express');
const router = express.Router();
const scheduleController = require('./controller/schedulecontroller');
const userController = require('./controller/usercontroller');

// User routes
router.post('/signup', userController.postuser);
router.post('/login', userController.loginuser);

// Schedule routes
router.post('/session', scheduleController.postSession);
router.get('/sessions', scheduleController.getSession);
router.post('/schedule', scheduleController.postSchedule);
router.get('/schedule', scheduleController.getSchedules);
router.delete('/schedule/:day', scheduleController.deleteSchedule);
router.delete('/session/:id', scheduleController.deleteSession);
router.put('/completesession/:id', scheduleController.putSession);



module.exports = router;