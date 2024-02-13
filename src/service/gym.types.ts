import { Gym } from "@/model/gym";
import { PaginateResult } from "mongoose";

interface Location {
  type: string;
  coordinates: number[];
}

export interface GymCreateRequest {
  title: string;
  description?: string | null;
  phone?: string | null;
  location: Location;
}
export interface GymCreateResponse {
  gym: Gym;
}

//---------------GETALLGYMS GYMS------------------------
export interface GetAllGymsRequest {
  filter?: string;
  page?: number;
}
export interface GetAllGymsResponse {
  gyms: PaginateResult<Gym>;
}

//---------------findNearbGyms GYMS------------------------
export interface FindNearbGymsRequest {
  location: Location;
}
export interface FindNearbGymsResponse {
  gyms: Gym[];
}
