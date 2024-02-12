import { IGym, IGymDoc } from "@/model/gym";
import { PaginateResult } from "mongoose";

export interface FindManyNearbyParams {
  latitude: number;
  longitude: number;
}

export interface GymRepository {
  create(data: IGym): Promise<IGymDoc>;
  findById(id: string): Promise<IGymDoc | null>;
  findManyNearby(params: FindManyNearbyParams): Promise<IGymDoc[]>;
  searchMany(filter: string, page: number): Promise<PaginateResult<IGymDoc>>;
}
