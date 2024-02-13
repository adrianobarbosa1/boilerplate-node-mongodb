import { BadRequestError } from "@/errors/bad-request-error";
import { NotAuthorizedError } from "@/errors/not-authorized-error";
import { authService } from "@/service/auth.service";
import { userService } from "@/service/user.service";
import { FastifyReply, FastifyRequest } from "fastify";
import { authValidation } from "../validations/auth.validations";

async function authRegister(req: FastifyRequest, res: FastifyReply) {
  const { name, email, password } = authValidation.authRegister.parse(req.body);
  try {
    const user = await userService.create({
      name,
      email,
      password,
    });

    return res.status(201).send({ user });
  } catch (err) {
    if (err instanceof BadRequestError) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
}

async function authLogin(req: FastifyRequest, res: FastifyReply) {
  const { email, password } = authValidation.authLogin.parse(req.body);

  try {
    const { user } = await authService.login({
      email,
      password,
    });

    const token = await res.jwtSign(
      { role: user.role },
      { sign: { sub: user.id } }
    );

    const refreshToken = await res.jwtSign(
      { role: user.role },
      { sign: { sub: user.id, expiresIn: "1d" } }
    );

    return res
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token });
  } catch (err) {
    if (err instanceof NotAuthorizedError) {
      return res.status(err.statusCode).send({ message: err.message });
    }

    throw err;
  }
}

async function refreshToken(req: FastifyRequest, res: FastifyReply) {
  try {
    await req.jwtVerify({ onlyCookie: true });

    const { role } = req.user;

    const token = await res.jwtSign(
      { role },
      {
        sign: {
          sub: req.user.sub,
        },
      }
    );

    const refreshToken = await res.jwtSign(
      { role },
      {
        sign: {
          sub: req.user.sub,
          expiresIn: "1d", // 1 dia para expirar
        },
      }
    );

    return res
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token });
  } catch (err) {
    throw new NotAuthorizedError();
  }
}

export const authController = {
  authRegister,
  authLogin,
  refreshToken,
};
