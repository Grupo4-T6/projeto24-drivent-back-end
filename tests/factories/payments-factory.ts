import faker from '@faker-js/faker';
import { Enrollment } from '@prisma/client';
import { prisma } from '@/config';
import { createEnrollmentWithAddress } from './enrollments-factory';
import { createUser } from '../factories';


export async function createPayment(enrollment?: Enrollment) {
  const user = await createUser();
  const incomingEnrollment = enrollment || (await createEnrollmentWithAddress(user));
  return prisma.payment.create({
    data: {
      Modality: faker.datatype.boolean(),
      Booking: faker.datatype.boolean(),
      isFinished: faker.datatype.boolean(),
      enrollmentId: incomingEnrollment.id
    },
  });
}
