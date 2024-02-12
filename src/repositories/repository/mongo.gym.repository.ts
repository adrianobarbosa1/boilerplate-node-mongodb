import Gym, { IGym } from "@/model/gym";
import { FindManyNearbyParams, GymRepository } from "../gyms.repository";

export class MongoGymRepository implements GymRepository {
  async create(data: IGym) {
    const gym = await Gym.create(data);
    return gym;
  }

  async findById(id: string) {
    const gym = await Gym.findById(id);
    return gym;
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const maxDistanceKm = 10; //distancia em km
    const gyms = await Gym.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [latitude, longitude], // A ordem aqui é [longitude, latitude]
          },
          $maxDistance: maxDistanceKm * 1000, // Converter de km para metros
        },
      },
    }).exec();

    return gyms;
  }

  async searchMany(filter: string, page: number) {
    const query = { title: filter };
    const options = { page };
    const gyms = await Gym.paginate(query, options);

    return gyms;
  }
}
