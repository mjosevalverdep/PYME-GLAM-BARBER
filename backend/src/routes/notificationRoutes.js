const express = require('express');
const notificationController = require('../controllers/NotificationController');
const router = express.Router();

router.post('/', notificationController.createNotification);

router.get('/', notificationController.getNotifications);

module.exports = router;
