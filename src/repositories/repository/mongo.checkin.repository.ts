import Checkin, { ICheckinDoc } from "@/model/checkin";
import dayjs from "dayjs";
import { CheckInRepository } from "../checkins.repository";

export class MongoCheckinRepository implements CheckInRepository {
  async create(data: ICheckinDoc) {
    const checkIn = await Checkin.create(data);

    return checkIn;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkIn = await Checkin.findOne({
      userId,
      createdAt: {
        $gte: startOfTheDay.toDate(),
        $lte: endOfTheDay.toDate(),
      },
    }).exec();

    return checkIn;
  }

  async findManyByUserId(userId: string, page: number) {
    const PAGE_SIZE = 20; // Tamanho da página
    const checkIns = await Checkin.find({
      userId,
    })
      .limit(PAGE_SIZE) // Limita o número de documentos retornados
      .skip((page - 1) * PAGE_SIZE) // Pula os documentos para a próxima página
      .exec();

    return checkIns;
  }

  async countByUserId(userId: string) {
    const count = await Checkin.countDocuments({
      userId,
    }).exec();

    return count;
  }

  async findById(id: string) {
    const checkIn = await Checkin.findById(id);

    return checkIn;
  }

  async save(data: ICheckinDoc) {
    const checkIn = await Checkin.findByIdAndUpdate(data.id, data, {
      new: true,
    });

    return checkIn;
  }
}
