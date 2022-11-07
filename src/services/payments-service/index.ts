import { notFoundError } from '@/errors';
import paymentRepository from '@/repositories/payment-repository';
import { Payment } from '@prisma/client'
import { exclude } from '@/utils/prisma-utils';

type PaymentCreate = Omit<Payment, 'id'>

async function createOrUpdatePaymentWithUserId(params: PaymentCreate) {
  return await paymentRepository.upsert(params.userId, params, exclude(params, "userID"))
}

async function getPayments(userId: number) {
  if (!userId) throw notFoundError();
  const purchase = await paymentRepository.find(userId);
  if (!purchase) throw notFoundError();
  return purchase;
}

const paymentsService = {
  createOrUpdatePaymentWithUserId,
  getPayments
};

export default paymentsService;
