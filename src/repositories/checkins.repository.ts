import { ICheckin, ICheckinDoc } from "@/model/checkin";

export interface CheckInRepository {
  create(data: ICheckin): Promise<ICheckinDoc>;
  findByUserIdOnDate(userId: string, date: Date): Promise<ICheckinDoc | null>;
  findManyByUserId(userId: string, page: number): Promise<ICheckinDoc[]>;
  countByUserId(userId: string): Promise<number>;
  findById(id: string): Promise<ICheckinDoc | null>;
  save(checkIn: ICheckin): Promise<ICheckinDoc | null>;
}
