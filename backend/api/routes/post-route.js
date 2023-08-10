import express from 'express';
import * as postController from '../controllers/post-controller.js';

const router = express.Router();

router.route('/create')
    .get(postController.post);

router.route('/:id')
    .get(postController.getById)
    .put(postController.put)
    .delete(postController.remove);


export default router;