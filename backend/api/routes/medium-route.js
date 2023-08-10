import express from 'express';
import * as mediumController from '../controllers/medium-controller.js';

const router = express.Router();

router.route('/get')
    .get(mediumController.getMediumUserArticles);

router.route('/create')
    .post(mediumController.createMediumArticle);

export default router;