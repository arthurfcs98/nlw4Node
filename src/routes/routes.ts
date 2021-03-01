import { Router } from 'express';
import UserController from '../controllers/UserController';
import SurveyController from '../controllers/SurveyController';
import SendMailController from '../controllers/SendMailController';

const router = Router();
const userController = new UserController();
const survyesController = new SurveyController();
const sendMailController = new SendMailController();

router.post('/users', userController.create);
router.get('/users', userController.show);
router.post('/surveys', survyesController.create);
router.get('/surveys', survyesController.show);
router.post('/sendMail', sendMailController.execute);

export default router;
