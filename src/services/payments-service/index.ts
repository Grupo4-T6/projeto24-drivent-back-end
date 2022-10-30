import { notFoundError } from '@/errors';
import paymentRepository, { CreatePaymentParams } from '@/repositories/payment-repository';
import { exclude } from '@/utils/prisma-utils';

async function createOrUpdatePaymentWithUserId(params: CreatePaymentParams) {
  const payment = params;

  const newPayment = await paymentRepository.upsert(params.userId, payment, exclude(payment, 'userId'));

  await  paymentRepository.upsert(payment.userId, payment , newPayment);
}

async function getPayments(userId: number) {
  const payment = await paymentRepository.findPayments(userId);
  if(!payment) throw notFoundError();
  return payment;
}

export type createOrUpdatePaymentWithUserId = CreatePaymentParams;

const paymentsService = {
  createOrUpdatePaymentWithUserId,
  getPayments
};

export default paymentsService;
