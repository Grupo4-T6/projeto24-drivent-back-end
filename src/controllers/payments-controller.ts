import { AuthenticatedRequest } from '@/middlewares';
import paymentService from '@/services/payments-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getPayments(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const payment = await paymentService.getPayments(userId);

  return res.status(httpStatus.OK).send(payment);
}

export async function postCreateOrUpdatePayment(req: AuthenticatedRequest, res: Response) {
  await paymentService.createOrUpdatePaymentWithUserId({
    ...req.body,
    userId: req.userId,
  });

  return res.sendStatus(httpStatus.OK);
}
