import { Router } from 'express';
import { getActivities } from '@/controllers/activity-controller';

const activitiesRouter = Router();

activitiesRouter.get('/', getActivities);

export { activitiesRouter };
