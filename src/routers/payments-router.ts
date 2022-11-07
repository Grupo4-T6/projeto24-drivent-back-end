import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getPayments, postCreateOrUpdatePayment } from '@/controllers/payments-controller';
import { paymentCreateSchema } from '@/schemas/payments-schemas';

const paymentRouter = Router();

paymentRouter
  .all('/*', authenticateToken)
  .get('/', getPayments)
  .post('/',validateBody(paymentCreateSchema), postCreateOrUpdatePayment);

export { paymentRouter };
