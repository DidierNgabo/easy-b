import express from 'express';
import userCtrl from '../controllers/user';
import multer from '../middlewares/multer';

const router = express.Router();

router.post('/', multer, userCtrl.createUser);
router.get('/:id', userCtrl.getUserById);
router.put('/:id', multer, userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);
router.get('/', userCtrl.getAllUsers);

export default router;
