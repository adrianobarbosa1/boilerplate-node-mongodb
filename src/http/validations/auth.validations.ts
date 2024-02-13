import { z } from "zod";

const authRegister = z.object({
  name: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(6),
});

const authLogin = z.object({
  email: z.string().email().min(1),
  password: z.string().min(6),
});

export const authValidation = {
  authRegister,
  authLogin,
};
