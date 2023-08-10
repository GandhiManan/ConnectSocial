import express from 'express';
import * as postController from '../controllers/post-controller.js';
import * as notificationController from '../controllers/notification-controller.js';

const router = express.Router();

router.route('/feed')
    .get(postController.getAllByAccountId);

router.route('/notification')
    .get(notificationController.getAllByAccountId);


export default router;