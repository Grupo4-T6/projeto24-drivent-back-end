import { prisma } from '@/config';
import { Payment } from '@prisma/client';

async function upsert(
  enrollmentId: number,
  createdPayment: CreatePaymentParams,
  updatedPayment: UpdatePaymentParams,
) {
  return prisma.payment.upsert({
    where: {
      enrollmentId,
    },
    create: createdPayment,
    update: updatedPayment,
  });
}

export type CreatePaymentParams = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdatePaymentParams = Omit<CreatePaymentParams, 'enrollmentId'>;

const paymentRepository = {
  upsert,
};

export default paymentRepository;
