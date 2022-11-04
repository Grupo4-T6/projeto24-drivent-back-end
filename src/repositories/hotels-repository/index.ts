import { prisma } from '@/config';

async function findAll() {
  const allHotels = prisma.hotel.findMany({ orderBy: { id: 'asc' } });

  return allHotels;
}

const hotelsRepository = {
  findAll,
};

export default hotelsRepository;
