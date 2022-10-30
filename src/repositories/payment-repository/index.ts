import { prisma } from '@/config';
import { Payment } from '@prisma/client';

async function findPayments(userId: number) {
  return prisma.payment.findUnique({
    where: {
      userId
    }
  })  
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

export type CreatePaymentParams = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdatePaymentParams = Omit<CreatePaymentParams, 'userId'>;

const paymentRepository = {
  upsert,
  findPayments,
};

export default paymentRepository;
