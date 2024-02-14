import { z } from "zod";

const checkinRegister = z.object({
  gymId: z.string().refine((value) => {
    return /^[0-9a-fA-F]{24}$/.test(value);
  }),
  userLocation: z.object({
    type: z.literal("Point"),
    coordinates: z
      .array(z.number())
      .length(2)
      .refine(
        ([longitude, latitude]) => {
          return Math.abs(latitude) <= 90 && Math.abs(longitude) <= 180;
        },
        {
          message:
            "As coordenadas devem ser válidas: [-180 <= longitude <= 180, -90 <= latitude <= 90]",
        }
      ),
  }),
});

const checkinRegisterParams = z.object({
  gymId: z.string().uuid(),
});

const checkinGetAllQuery = z.object({
  page: z.coerce.number().min(1).default(1),
});

const checkinValidateParams = z.object({
  checkInId: z.string().uuid(),
});

export const checkinValidation = {
  checkinRegister,
  checkinRegisterParams,
  checkinGetAllQuery,
  checkinValidateParams,
};
