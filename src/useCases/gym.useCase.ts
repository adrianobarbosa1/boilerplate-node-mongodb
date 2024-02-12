import { GymRepository } from "@/repositories/gyms.repository";
import {
  FindNearbGymsUseCaseRequest,
  FindNearbGymsUseCaseResponse,
  GetAllGymsUseCaseRequest,
  GetAllGymsUseCaseResponse,
  GymCreateUseCaseRequest,
  GymCreateUseCaseResponse,
} from "./gym.types";

export class GymUseCase {
  constructor(private gymRepository: GymRepository) {}

  async create({
    title,
    description,
    phone,
    location,
  }: GymCreateUseCaseRequest): Promise<GymCreateUseCaseResponse> {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      location,
    });

    return {
      gym,
    };
  }

  async getAllGyms({
    filter,
    page,
  }: GetAllGymsUseCaseRequest): Promise<GetAllGymsUseCaseResponse> {
    const gyms = await this.gymRepository.searchMany(filter, page);

    return {
      gyms,
    };
  }

  async findNearbGyms({
    userLatitude,
    userLongitude,
  }: FindNearbGymsUseCaseRequest): Promise<FindNearbGymsUseCaseResponse> {
    const gyms = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return {
      gyms,
    };
  }
}
