import { prisma } from '@/config';
import { Payment } from '@prisma/client';

async function findPayments(enrollmentId: number) {
  return prisma.payment.findUnique({
    where: {
      enrollmentId
    }
  })  
}

async function upsert(
  enrollmentId: number,
  createdEnrollment: CreatePaymentParams,
  updatedEnrollment: UpdatePaymentParams,
) {
  return prisma.payment.upsert({
    where: {
      enrollmentId,
    },
    create: createdEnrollment,
    update: updatedEnrollment,
  });
}

export type CreatePaymentParams = Omit<Payment, 'id' | 'createdAt' | 'updatedAt' | 'userId'>;
export type UpdatePaymentParams = Omit<CreatePaymentParams, 'enrollmentId'>;

const paymentRepository = {
  upsert,
  findPayments,
};

export default paymentRepository;
