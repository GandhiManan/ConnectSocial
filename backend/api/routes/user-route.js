import express from 'express';
import * as userController from '../controllers/user-controller.js';

const router = express.Router();

router.route('/register')
    // .get(userController.index)
    .get(userController.searchByEmail)
    .post(userController.post);

router.route('/login').get(userController.index)
    // .get(userController.searchByEmail);

router.route('/get-user/:id')
    .get(userController.getById)
    .put(userController.put);


export default router;