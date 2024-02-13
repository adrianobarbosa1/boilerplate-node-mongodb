// import dayjs from "dayjs";
// import { BadRequestError } from "../errors/bad-request-error";
// import { NotFoundError } from "../errors/not-found-error";
// import Checkin from "../model/checkin";
// import Gym from "../model/gym";
// import { getDistanceBetweenCoordinates } from "../utils/getDistanceBetweenCoordenates";
// import {
//   CheckInGetAllUseCaseRequest,
//   CheckInGetAllUseCaseResponse,
//   ValidateCheckinRequest,
//   ValidateCheckinResponse,
//   getAllChekinsByUserIdUseCaseRequest,
//   getAllChekinsByUserIdUseCaseResponse,
// } from "./checkin.types";

// export const create = async ({
//   userId,
//   gymId,
//   userLatitude,
//   userLongitude,
// }) => {
//   const gym = await Gym.findById(gymId);
//   if (!gym) {
//     throw new NotFoundError();
//   }

//   const distance = getDistanceBetweenCoordinates(
//     { latitude: userLatitude, longitude: userLongitude },
//     {
//       latitude: gym.latitude.toNumber(),
//       longitude: gym.longitude.toNumber(),
//     }
//   );
//   const MAX_DISTANCE_IN_KILOMETERS = 0.1;

//   if (distance > MAX_DISTANCE_IN_KILOMETERS) {
//     throw new BadRequestError("Deve está no raio da academia");
//   }
//   const date = new Date();
//   const startOfTheDay = dayjs(date).startOf("date");
//   const endOfTheDay = dayjs(date).endOf("date");

//   const checkInOnSameDay = await Checkin.findOne({
//     userId,
//     createdAt: {
//       $gte: startOfTheDay.toDate(),
//       $lte: endOfTheDay.toDate(),
//     },
//   }).exec();

//   if (checkInOnSameDay) {
//     throw new BadRequestError("Quantidade maxima de chekin atingido!");
//   }

//   const checkIn = await Checkin.create({
//     gymId,
//     userId,
//   });

//   return {
//     checkIn,
//   };
// };

// const getAll = async ({
//   userId,
//   page,
// }: CheckInGetAllUseCaseRequest): Promise<CheckInGetAllUseCaseResponse> => {
//   const PAGE_SIZE = 20; // Tamanho da página
//   const checkIns = await Checkin.find({
//     userId,
//   })
//     .limit(PAGE_SIZE) // Limita o número de documentos retornados
//     .skip((page - 1) * PAGE_SIZE) // Pula os documentos para a próxima página
//     .exec();

//   return {
//     checkIns,
//   };
// };

// const getAllChekinsByUserId = async ({
//   userId,
// }: getAllChekinsByUserIdUseCaseRequest): Promise<getAllChekinsByUserIdUseCaseResponse> => {
//   const checkInsCount = await Checkin.countDocuments({
//     userId,
//   }).exec();

//   return {
//     checkInsCount,
//   };
// };

// const validateCheckin = async ({
//   checkInId,
// }: ValidateCheckinRequest): Promise<ValidateCheckinResponse> => {
//   const checkIn = await this.checkInsRepository.findById(checkInId);

//   if (!checkIn) {
//     throw new NotFoundError();
//   }

//   const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
//     checkIn.createdAt,
//     "minutes"
//   );

//   if (distanceInMinutesFromCheckInCreation > 20) {
//     throw new BadRequestError("Checkin expired");
//   }

//   checkIn.validatedAt = new Date();

//   await this.checkInsRepository.save(checkIn);

//   return {
//     checkIn,
//   };
// };

// export const checkinService = {
//   create,
//   getAll,
//   getAllChekinsByUserId,
//   validateCheckin,
// };
