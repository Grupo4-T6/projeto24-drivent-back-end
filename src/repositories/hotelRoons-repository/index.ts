import { prisma } from '@/config';

async function sumMaxOcupation() {
  const sumMaxOcupation = prisma.hotelRooms.groupBy({
    by: ['hotelId'],
    _sum: { maxOcupation: true },
    orderBy: {
      hotelId: 'asc',
    },
    having: {
      hotelId: {
        _sum: {
          gt: 1,
        },
      },
    },
  });

  return sumMaxOcupation;
}

async function sumTakedRoons() {
  const sumRoonsTaked = prisma.hotelRooms.groupBy({
    by: ['hotelId'],
    _sum: { spacesTaked: true },
    orderBy: {
      hotelId: 'asc',
    },
    having: {
      hotelId: {
        _sum: {
          gt: 1,
        },
      },
    },
  });

  return sumRoonsTaked;
}

const hotelsRoonsRepository = {
  sumMaxOcupation,
  sumTakedRoons,
};

export default hotelsRoonsRepository;
