import express from "express";
const router = express.Router();

import { createJob , getAllJobs , deleteJob , updateJob , showStats} from '../controllers/jobsController.js'

//private routes handled through server.js
router.route('/').post(createJob).get(getAllJobs)
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteJob).patch(updateJob)

export default router;
