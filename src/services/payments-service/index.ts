import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import paymentRepository, { CreatePaymentParams } from '@/repositories/payment-repository';
import { exclude } from '@/utils/prisma-utils';

async function createOrUpdatePaymentWithUserId(params: CreatePaymentParams) {
  const payment = params;

  const newPayment = await paymentRepository.upsert(params.enrollmentId, payment, exclude(payment, 'enrollmentId'));

  await  paymentRepository.upsert(payment.enrollmentId, payment , newPayment);
}

async function getPayments(userId: number) {
  if(!userId) throw notFoundError();
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if(!enrollment) throw notFoundError();
  const payment = await paymentRepository.findPayments(enrollment.id);
  if(!payment) throw notFoundError();
  return payment;
}

export type createOrUpdatePaymentWithUserId = CreatePaymentParams;

const paymentsService = {
  createOrUpdatePaymentWithUserId,
  getPayments
};

export default paymentsService;
