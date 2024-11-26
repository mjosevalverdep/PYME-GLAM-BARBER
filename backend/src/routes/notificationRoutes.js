const express = require('express');
const notificationController = require('../controllers/NotificationController');
const router = express.Router();

router.post('/', notificationController.createNotification);

router.get('/:clienteID', notificationController.getNotifications);

router.put('/:id/read', notificationController.markAsRead);

module.exports = router;
