import { notFoundError } from '@/errors';
import hotelsRepository from '@/repositories/hotels-repository';
import hotelRoonsRepository from '@/repositories/hotelRoons-repository';
import { exclude } from '@/utils/prisma-utils';
import { Hotel } from '@prisma/client';
import dayjs from 'dayjs';

async function getAllHotels() {
  const hotels = await hotelsRepository.findAll();
  const maxOcupationRoons = await hotelRoonsRepository.sumMaxOcupation();
  if (!hotels) throw notFoundError();
  if (!maxOcupationRoons) throw notFoundError();
  const takedRoons = await hotelRoonsRepository.sumTakedRoons();
  const avaliableRoons = calculateAvaliableRoons(maxOcupationRoons, takedRoons);
  const formatedReturn = formatReturn(hotels, avaliableRoons);

  return formatedReturn;
}

function calculateAvaliableRoons(
  maxOcupationRoons: Array<{ _sum: { maxOcupation: number }; hotelId: number }>,
  takedRoons: Array<{ _sum: { spacesTaked: number }; hotelId: number }>,
) {
  const avaliableRoons = maxOcupationRoons.map((max, index) => {
    if (max.hotelId === takedRoons[index].hotelId) {
      return { hotelId: max.hotelId, avaliableRoons: max._sum.maxOcupation - takedRoons[index]._sum.spacesTaked };
    } else {
      // if the hotelId does not match by index order its need to use find method
      const takedRoom = takedRoons.find((taked) => {
        taked.hotelId === max.hotelId;
      });
      return { hotelId: max.hotelId, avaliableRoons: max._sum.maxOcupation - takedRoom._sum.spacesTaked };
    }
  });
  return avaliableRoons;
}

function formatReturn(hotels: Array<Hotel>, avaliableRoons: Array<{ hotelId: number; avaliableRoons: number }>) {
  const formatedReturn = hotels.map((hotel, index) => {
    exclude(hotel, 'createdAt', 'updatedAt');
    if (hotel.id === avaliableRoons[index].hotelId) {
      return { ...hotel, avaliableRoons: avaliableRoons[index].avaliableRoons };
    } else {
      // if the hotelId does not match by index order its need to use find method
      const matchAvaliableRoom = avaliableRoons.find((avali) => {
        avali.hotelId === hotel.id;
      });
      return { ...hotel, avaliableRoons: matchAvaliableRoom.avaliableRoons };
    }
  });
  return formatedReturn;
}

export type GetFirstEventResult = Omit<Event, 'createdAt' | 'updatedAt'>;

const eventsService = {
  getAllHotels,
};

export default eventsService;
