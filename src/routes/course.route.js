// External Packages
import express from 'express';

// Middlewares
import auth from '../middlewares/auth';

// Controllers
import { courseController } from '../controllers/index';

const { createCourse, getAllCourses, getCourse, updateCourse, deleteCourse } =
  courseController;

const router = express.Router();

router.route('/').get(getAllCourses).post(auth('admin'), createCourse);

router
  .route('/:id')
  .get(getCourse)
  .patch(auth('admin'), updateCourse)
  .delete(auth('admin'), deleteCourse);

export default router;
