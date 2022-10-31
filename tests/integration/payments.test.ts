import app, { init } from '@/app';
import { prisma } from '@/config';
import { exclude } from '@/utils/prisma-utils';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';
import { createEnrollmentWithAddress, createPayment, createUser } from '../factories';
import { cleanDb, generateValidToken } from '../helpers';

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe('GET /payments', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/payments');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/payments').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/payments').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 204 when there is no payment for given user', async () => {
      const token = await generateValidToken();

      const response = await server.get('/payments').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it('should respond with status 200 and enrollment data with address when there is a enrollment for given user', async () => {
      const user = await createUser();
      const enrollment = await createEnrollmentWithAddress(user);
      const payment = await createPayment(enrollment);
      const token = await generateValidToken(user);

      const response = await server.get('/payments').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.OK);
      expect(exclude(response.body, 'createdAt', 'updatedAt')).toEqual({
        id: payment.id,
        Modality: payment.Modality,
        Booking: payment.Booking,
        isFinished: payment.isFinished,
        enrollmentId: payment.enrollmentId,
      });
    });
  });
});

// describe('POST /payments', () => {
//   it('should respond with status 401 if no token is given', async () => {
//     const response = await server.post('/payments');

//     expect(response.status).toBe(httpStatus.UNAUTHORIZED);
//   });

//   it('should respond with status 401 if given token is not valid', async () => {
//     const token = faker.lorem.word();

//     const response = await server.post('/payments').set('Authorization', `Bearer ${token}`);

//     expect(response.status).toBe(httpStatus.UNAUTHORIZED);
//   });

//   it('should respond with status 401 if there is no session for given token', async () => {
//     const userWithoutSession = await createUser();
//     const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

//     const response = await server.post('/payments').set('Authorization', `Bearer ${token}`);

//     expect(response.status).toBe(httpStatus.UNAUTHORIZED);
//   });

//   describe('when token is valid', () => {
//     it('should respond with status 400 when body is not present', async () => {
//       const token = await generateValidToken();

//       const response = await server.post('/payments').set('Authorization', `Bearer ${token}`);

//       expect(response.status).toBe(httpStatus.BAD_REQUEST);
//     });

//     it('should respond with status 400 when body is not valid', async () => {
//       const token = await generateValidToken();
//       const body = { [faker.lorem.word()]: faker.lorem.word() };

//       const response = await server.post('/payments').set('Authorization', `Bearer ${token}`).send(body);

//       expect(response.status).toBe(httpStatus.BAD_REQUEST);
//     });

//     describe('when body is valid', async () => {
//       const user = await createUser();
//       const enrollment = await createEnrollmentWithAddress(user);
//       const generateValidBody = () => ({
//         Modality: faker.datatype.boolean(),
//         Booking: faker.datatype.boolean(),
//         isFinished: faker.datatype.boolean(),
//         enrollmentId: enrollment.id
//       });

//       it('should respond with status 201 and create new enrollment if there is not any', async () => {
//         const body = generateValidBody();
//         const token = await generateValidToken();

//         const response = await server.post('/payments').set('Authorization', `Bearer ${token}`).send(body);

//         expect(response.status).toBe(httpStatus.OK);
//         const payment = await prisma.payment.findFirst({ where: { enrollmentId: body.enrollmentId } });
//         expect(payment).toBeDefined();
//       });

//       it('should respond with status 200 and update enrollment if there is one already', async () => {
//         const user = await createUser();
//         const body = generateValidBody();
//         const token = await generateValidToken(user);
//         const enrollment = await createEnrollmentWithAddress(user);

//         const response = await server.post('/payments').set('Authorization', `Bearer ${token}`).send(body);

//         expect(response.status).toBe(httpStatus.OK);
//         const updatePayment = await prisma.payment.findUnique({ where: { enrollmentId: enrollment.id } });
//         expect(updatePayment).toBeDefined();
//         expect(updatePayment).toEqual(
//           expect.objectContaining({
//             Modality: body.Modality,
//             Booking: body.Booking,
//             isFinished: body.isFinished,
//             enrollmentId: body.enrollmentId
//           }),
//         );
//       });
//     });
//   });
// });
