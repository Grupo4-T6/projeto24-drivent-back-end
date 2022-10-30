import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getPayments, postCreateOrUpdatePayment } from '@/controllers/payments-controller';

const paymentRouter = Router();

paymentRouter
  .all('/*', authenticateToken)
  .get('/', getPayments)
  .post('/', postCreateOrUpdatePayment);

export { paymentRouter };
