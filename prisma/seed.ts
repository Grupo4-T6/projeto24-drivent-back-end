import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
      },
    });
  }

  console.log({ event });
  await hotelSeed();
}

async function hotelSeed() {
  await prisma.hotel.create({
    data: {
      name: 'Driven Resort',
      type: 'Single e Double',
      imageUrl:
        'https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/orlandofl/5900_pool_b92df465-0c67-4161-b8bb-67f9fc301094.jpg',
    },
  });
  await prisma.hotel.create({
    data: {
      name: 'Driven Palace',
      type: 'Single, Double e Triple',
      imageUrl:
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/22443290.jpg?k=ea72ebbd18972a57df7d0894168904b7abf1d0d1e4e84dadcaee0d4278f467ff&o=&hp=1',
    },
  });
  await prisma.hotel.create({
    data: {
      name: 'Driven World',
      type: 'Single',
      imageUrl:
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/370564672.jpg?k=4f37af06c05a6f5dfc7db5e8e71d2eb66cae6eec36af7a4a4cd7a25d65ceb941&o=&hp=1',
    },
  });

  await hotelRoomSeed('Driven Resort', 6, 6, 0);
  await hotelRoomSeed('Driven Palace', 3, 4, 5);
  await hotelRoomSeed('Driven World', 8, 0, 0);
}

async function hotelRoomSeed(hotelName: string, SingleRoons: number, DoubleRoons: number, TripleRoons: number) {
  const hotel = await prisma.hotel.findFirst({ where: { name: hotelName } });
  let hotelId: number;
  let hotelRoomCounter = 0;
  if (hotel === null) {
    hotelId = 1;
  } else {
    hotelId = hotel.id;
  }
  for (let i = 0; i < SingleRoons; i++) {
    hotelRoomCounter++;
    if (i < 6) {
      await prisma.hotelRooms.create({
        data: {
          hotelId,
          maxOcupation: 1,
          roomNumber: hotelRoomCounter,
        },
      });
    }
  }
  for (let i = 0; i < DoubleRoons; i++) {
    hotelRoomCounter++;
    if (i < 6) {
      await prisma.hotelRooms.create({
        data: {
          hotelId,
          maxOcupation: 2,
          roomNumber: hotelRoomCounter,
        },
      });
    }
  }
  for (let i = 0; i < TripleRoons; i++) {
    hotelRoomCounter++;
    if (i < 6) {
      await prisma.hotelRooms.create({
        data: {
          hotelId,
          maxOcupation: 3,
          roomNumber: hotelRoomCounter,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
