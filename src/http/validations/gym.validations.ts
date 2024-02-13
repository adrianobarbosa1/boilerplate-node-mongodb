import { z } from "zod";

const gymRegister = z.object({
  title: z.string().min(1),
  description: z.string().nullable(),
  phone: z.string().nullable(),
  location: z.object({
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

const gymSearch = z.object({
  filter: z.string(),
  page: z.coerce.number().min(1).default(1),
});

const gymNearby = z.object({
  location: z.object({
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

export const gymValidation = {
  gymRegister,
  gymSearch,
  gymNearby,
};
