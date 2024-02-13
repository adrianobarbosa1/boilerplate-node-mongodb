import { BadRequestError } from "@/errors/bad-request-error";
import { DatabaseConnectionError } from "@/errors/database-connection-error";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { InternalServerError } from "../../errors/internal-server-error";
import { NotAuthorizedError } from "../../errors/not-authorized-error";
import { NotFoundError } from "../../errors/not-found-error";

export const errorHandler = (
  error: FastifyError,
  req: FastifyRequest,
  res: FastifyReply
) => {
  if (error instanceof BadRequestError) {
    return res.status(error.statusCode).send({
      statusCode: error.statusCode,
      message: error.message,
      errors: error.serializeErrors(),
    });
  }
  if (error instanceof DatabaseConnectionError) {
    return res.status(error.statusCode).send({
      statusCode: error.statusCode,
      message: error.message,
      errors: error.serializeErrors(),
    });
  }

  if (error instanceof NotFoundError) {
    return res.status(error.statusCode).send({
      statusCode: error.statusCode,
      message: error.message,
      errors: error.serializeErrors(),
    });
  }

  if (error instanceof NotAuthorizedError) {
    return res.status(error.statusCode).send({
      statusCode: error.statusCode,
      message: error.message,
      errors: error.serializeErrors(),
    });
  }

  if (error instanceof ZodError) {
    return res.status(400).send({
      statusCode: 400,
      message: "Invalid request parameters",
      error: error.format(),
    });
  }

  if (process.env.NODE_ENV === "prod") {
    console.error(error);
  } else {
    // ferramenta de observalidade
  }

  throw new InternalServerError();
};
