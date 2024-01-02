import express from 'express';
import controller from '../controllers/Generic';
import { Schemas, ValidateJoi } from '../middleware/Joi';
import model from '../models/Author';

const router = express.Router();

router.post('/create', ValidateJoi(Schemas.author.create), controller.create(model));
router.get('/get', controller.getAll(model));
router.get('/get/:authorId', controller.get(model));
router.patch('/update/:authorId', ValidateJoi(Schemas.author.update), controller.update(model));
//router.delete('/delete/:authorId', controller.deleteDoc(model));

export = router;
