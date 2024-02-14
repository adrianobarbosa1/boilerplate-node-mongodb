import { Checkin, ICheckinDoc } from "@/model/checkin";

interface Location {
  type: string;
  coordinates: number[];
}

export interface CheckInCreateRequest {
  userId: string;
  gymId: string;
  location: Location;
}
export interface CheckInCreateResponse {
  checkIn: ICheckinDoc;
}

//---------------GET ALL CHEKINS------------------------
export interface CheckInGetAllRequest {
  userId: string;
  page: number;
}
export interface CheckInGetAllResponse {
  checkIns: ICheckinDoc[];
}

//---------------GETALLCHEKINSBYUSERID CHEKINS------------------------
export interface getAllChekinsByUserIdRequest {
  userId: string;
}
export interface getAllChekinsByUserIdResponse {
  checkInsCount: number;
}

//---------------validateCheckin CHEKINS------------------------
export interface ValidateCheckinRequest {
  checkinId: string;
}
export interface ValidateCheckinResponse {
  checkIn: Checkin;
}
