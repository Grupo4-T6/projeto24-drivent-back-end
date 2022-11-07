import { notFoundError } from "@/errors";
import activitiesRepository from "@/repositories/activities-repository";

async function get() {
    const activities = await activitiesRepository.getActivities();
    if (!activities) throw notFoundError();

    return activities;
}

const activitiesServices = {
    get
}

export default activitiesServices;