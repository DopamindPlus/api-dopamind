import { Router } from 'express';
import { typeDoctorController } from '../controllers/typeDoctorController.js';
import { validateTypeDoctor } from '../middlewares/validateRequest.js';

const router = Router();

router.get('/', typeDoctorController.getAll);
router.get('/:id', typeDoctorController.getById);
router.post('/', validateTypeDoctor, typeDoctorController.create);
router.put('/:typeId/doctors/:doctorId', typeDoctorController.addDoctor);

export default router;
