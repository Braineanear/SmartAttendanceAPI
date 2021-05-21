// External Packages
import express from 'express';

// Middlewares
import auth from '../middlewares/auth';

// Controllers
import { groupController } from '../controllers/index';

const {
  createGroup,
  getAllGroups,
  getGroup,
  getGroupsAndDepartments,
  updateGroup,
  deleteGroup
} = groupController;

const router = express.Router();

router.get('/department', getGroupsAndDepartments);

router.route('/').get(getAllGroups).post(auth('admin'), createGroup);

router
  .route('/:id')
  .get(getGroup)
  .patch(auth('admin'), updateGroup)
  .delete(auth('admin'), deleteGroup);

export default router;
