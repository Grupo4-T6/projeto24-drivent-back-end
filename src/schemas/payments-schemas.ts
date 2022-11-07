
import Joi from 'joi';
import { Payment } from '@prisma/client';

type paymentSchema = Omit<Payment, 'id' | 'userId' | 'createdAt' | 'updatedAt'>

export const paymentCreateSchema = Joi.object<paymentSchema>({
    Total: Joi.number().required(),
    Booking: Joi.boolean().required(),
    Modality: Joi.boolean().required(),
    isFinished: Joi.boolean().required()

});