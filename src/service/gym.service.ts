import Gym from "@/model/gym";
import {
  FindNearbGymsRequest,
  FindNearbGymsResponse,
  GetAllGymsRequest,
  GetAllGymsResponse,
  GymCreateRequest,
  GymCreateResponse,
} from "./gym.types";

const create = async ({
  title,
  description,
  phone,
  location,
}: GymCreateRequest): Promise<GymCreateResponse> => {
  const gym = await Gym.create({
    title,
    description,
    phone,
    location,
  });

  return {
    gym,
  };
};

const getAllGyms = async ({
  filter,
  page,
}: GetAllGymsRequest): Promise<GetAllGymsResponse> => {
  const query = { title: { $regex: filter, $options: "i" } };
  const options = { page };
  const gyms = await Gym.paginate(query, options);

  return {
    gyms,
  };
};

const findNearbGyms = async ({
  location,
}: FindNearbGymsRequest): Promise<FindNearbGymsResponse> => {
  const maxDistanceKm = 10; //distancia em km
  const longitude = location.coordinates[0];
  const latitude = location.coordinates[1];

  console.log(longitude, latitude, "localtion");
  const gyms = await Gym.find({
    location: {
      $nearSphere: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        $maxDistance: maxDistanceKm * 1000, // Converter de km para metros
      },
    },
  }).exec();

  console.log(gyms);

  return {
    gyms,
  };
};

export const gymService = {
  create,
  getAllGyms,
  findNearbGyms,
};
