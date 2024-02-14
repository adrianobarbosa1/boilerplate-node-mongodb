import { Checkin, ICheckinDoc } from "@/model/checkin";

export interface CheckInRepository {
  create(data: Checkin): Promise<ICheckinDoc>;
  findByUserIdOnDate(userId: string, date: Date): Promise<ICheckinDoc | null>;
  findManyByUserId(userId: string, page: number): Promise<ICheckinDoc[]>;
  countByUserId(userId: string): Promise<number>;
  findById(id: string): Promise<ICheckinDoc | null>;
  save(checkIn: Checkin): Promise<ICheckinDoc | null>;
}
