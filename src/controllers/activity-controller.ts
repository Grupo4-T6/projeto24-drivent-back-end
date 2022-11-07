import { Request, Response } from 'express';
import activityService from '@/services/activities-service';
import httpStatus from 'http-status';

export async function getActivities(req: Request, res: Response){
    const activities = await activityService.get();
    
    res.status(httpStatus.OK).send(activities)
}