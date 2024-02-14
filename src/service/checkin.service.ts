import { getDistanceBetweenCoordinates } from "@/utils/getDistanceBetweenCoordenates";
import dayjs from "dayjs";
import { BadRequestError } from "../errors/bad-request-error";
import { NotFoundError } from "../errors/not-found-error";
import Checkin from "../model/checkin";
import Gym from "../model/gym";
import {
  CheckInCreateRequest,
  CheckInCreateResponse,
  CheckInGetAllRequest,
  CheckInGetAllResponse,
  ValidateCheckinRequest,
  ValidateCheckinResponse,
  getAllChekinsByUserIdRequest,
  getAllChekinsByUserIdResponse,
} from "./checkin.types";

const create = async ({
  userId,
  gymId,
  location,
}: CheckInCreateRequest): Promise<CheckInCreateResponse> => {
  const gym = await Gym.findById(gymId);
  if (!gym) {
    throw new NotFoundError();
  }

  const gymLongitude = gym.location.coordinates[0];
  const gymLatitude = gym.location.coordinates[1];

  const userLongitude = location.coordinates[0];
  const userLatitude = location.coordinates[1];

  const distance = getDistanceBetweenCoordinates(
    { latitude: userLatitude, longitude: userLongitude },
    {
      latitude: gymLatitude,
      longitude: gymLongitude,
    }
  );
  const MAX_DISTANCE_IN_KILOMETERS = 0.1;
  if (distance > MAX_DISTANCE_IN_KILOMETERS) {
    throw new BadRequestError("Deve está no raio da academia");
  }

  const date = new Date();
  const startOfTheDay = dayjs(date).startOf("date");
  const endOfTheDay = dayjs(date).endOf("date");
  const checkInOnSameDay = await Checkin.findOne({
    userId,
    createdAt: {
      $gte: startOfTheDay.toDate(),
      $lte: endOfTheDay.toDate(),
    },
  }).exec();
  if (checkInOnSameDay) {
    throw new BadRequestError("Quantidade maxima de chekin atingido!");
  }

  const checkIn = await Checkin.create({
    gymId,
    userId,
  });

  return {
    checkIn,
  };
};

const getAll = async ({
  userId,
  page,
}: CheckInGetAllRequest): Promise<CheckInGetAllResponse> => {
  const PAGE_SIZE = 20; // Tamanho da página
  const checkIns = await Checkin.find({
    userId,
  })
    .limit(PAGE_SIZE) // Limita o número de documentos retornados
    .skip((page - 1) * PAGE_SIZE) // Pula os documentos para a próxima página
    .exec();

  return {
    checkIns,
  };
};

const getAllChekinsByUserId = async ({
  userId,
}: getAllChekinsByUserIdRequest): Promise<getAllChekinsByUserIdResponse> => {
  const checkInsCount = await Checkin.countDocuments({
    userId,
  }).exec();

  return {
    checkInsCount,
  };
};

const validateCheckin = async ({
  checkinId,
}: ValidateCheckinRequest): Promise<ValidateCheckinResponse> => {
  const checkInExist = await Checkin.findById(checkinId);
  if (!checkInExist) {
    throw new NotFoundError();
  }

  const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
    checkInExist.createdAt,
    "minutes"
  );

  if (distanceInMinutesFromCheckInCreation > 20) {
    throw new BadRequestError("Checkin expired");
  }

  checkInExist.validatedAt = new Date();

  const checkIn = await Checkin.findByIdAndUpdate(checkinId, checkInExist, {
    new: true,
  });

  return {
    checkIn,
  };
};

export const checkinService = {
  create,
  getAll,
  getAllChekinsByUserId,
  validateCheckin,
};
