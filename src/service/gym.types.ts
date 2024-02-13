import { IGymDoc } from "@/model/gym";
import { PaginateResult } from "mongoose";

interface Location {
  type: string;
  coordinates: number[];
}

export interface GymCreateUseCaseRequest {
  title: string;
  description: string | undefined;
  phone: string | undefined;
  location: Location;
}
export interface GymCreateUseCaseResponse {
  gym: IGymDoc;
}

//---------------GETALLGYMS GYMS------------------------
export interface GetAllGymsUseCaseRequest {
  filter: string;
  page: number;
}
export interface GetAllGymsUseCaseResponse {
  gyms: PaginateResult<IGymDoc>;
}

//---------------findNearbGyms GYMS------------------------
export interface FindNearbGymsUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}
export interface FindNearbGymsUseCaseResponse {
  gyms: IGymDoc[];
}
