// External Packages
import express from 'express';

// Middlewares
import auth from '../middlewares/auth';

// Controllers
import { departmentController } from '../controllers/index';

const {
  createDepartment,
  getAllDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment
} = departmentController;

const router = express.Router();

router.route('/').get(getAllDepartments).post(auth('admin'), createDepartment);

router
  .route('/:id')
  .get(getDepartment)
  .patch(auth('admin'), updateDepartment)
  .delete(auth('admin'), deleteDepartment);

export default router;
