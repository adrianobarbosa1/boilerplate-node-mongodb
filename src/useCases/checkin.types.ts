import { ICheckinDoc } from "@/model/checkin";

export interface CheckInCreateUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}
export interface CheckInCreateUseCaseResponse {
  checkIn: ICheckinDoc;
}

//---------------GET ALL CHEKINS------------------------
export interface CheckInGetAllUseCaseRequest {
  userId: string;
  page: number;
}
export interface CheckInGetAllUseCaseResponse {
  checkIns: ICheckinDoc[];
}

//---------------GETALLCHEKINSBYUSERID CHEKINS------------------------
export interface getAllChekinsByUserIdUseCaseRequest {
  userId: string;
}
export interface getAllChekinsByUserIdUseCaseResponse {
  checkInsCount: number;
}

//---------------validateCheckin CHEKINS------------------------
export interface ValidateCheckinRequest {
  checkInId: string;
}
export interface ValidateCheckinResponse {
  checkIn: ICheckinDoc;
}
