import { prisma } from '@/config';
import { Payment } from '@prisma/client';

async function find(userId: number) {
  return prisma.payment.findFirst({
    where: {
      userId
    }
  });
}

async function upsert(
  userId: number,
  createdEnrollment: CreatePaymentParams,
  updatedEnrollment: UpdatePaymentParams,
) {
  return prisma.payment.upsert({
    where: {
      userId,
    },
    create: createdEnrollment,
    update: updatedEnrollment,
  });
}

async function deletePayment(userId: number) {
  return prisma.payment.delete({
    where: {
      userId
    }
  })
}

export type CreatePaymentParams = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdatePaymentParams = Omit<CreatePaymentParams, 'userId'>;

const paymentRepository = {
  upsert,
  find,
  deletePayment
};

export default paymentRepository;
