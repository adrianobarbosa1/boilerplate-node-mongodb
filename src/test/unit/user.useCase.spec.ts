import { BadRequestError } from "@/useCases/errors/bad-request-error";
import { makeUserUsercase } from "@/useCases/factory/make.user.useCase";
import { compare } from "bcryptjs";
import { describe, expect, it } from "vitest";
import {
  connectMongoInMemory,
  dbClear,
  dbDisconnect,
} from "../helper/mongodb.memory";

const userUseCase = makeUserUsercase();

describe("USER useCase", async () => {
  beforeEach(async () => {
    await connectMongoInMemory();
  });

  afterEach(async () => {
    await dbClear();
    await dbDisconnect();
  });

  describe("Create user", async () => {
    it("deve poder criar um usuario", async () => {
      const createUser = {
        name: "John Doe",
        email: "johndoe5@exemple.com",
        password: "123456",
      };
      const { user } = await userUseCase.create(createUser);
      expect(user.id).toEqual(expect.any(String));
    });

    it("deve poder criar um usuario", async () => {
      const createUser = {
        name: "John Doe",
        email: "johndoe5@exemple.com",
        password: "123456",
      };
      const { user } = await userUseCase.create(createUser);
      expect(user.id).toEqual(expect.any(String));
    });

    it("deve incriptografar a senha do usuário no momento do registro", async () => {
      const createUser = {
        name: "John Doe",
        email: "johndoe5@exemple.com",
        password: "123456",
      };
      const { user } = await userUseCase.create(createUser);

      const passwordHash = await compare(
        createUser.password,
        user.passwordHash
      );

      expect(passwordHash).toBe(true);
    });

    it("não deve poder criar usuario com email duplicado", async () => {
      await userUseCase.create({
        name: "John Doe",
        email: "johndoe5@exemple.com",
        password: "123456",
      });

      await expect(() =>
        userUseCase.create({
          name: "John Doe",
          email: "johndoe5@exemple.com",
          password: "123456",
        })
      ).rejects.toBeInstanceOf(BadRequestError);
    });
  });

  describe("GetUserProfile user", async () => {
    it("deve poder pegar o perfil de um usuario pelo id", async () => {
      const createUserResponse = await userUseCase.create({
        name: "John Doe",
        email: "johndoe5@exemple.com",
        password: "123456",
      });

      console.log(createUserResponse, "createUser");

      const { user } = await userUseCase.getUserProfile({
        userId: createUserResponse.id,
      });

      expect(user.id).toEqual(expect.any(String));
      expect(user.name).toEqual("John Doe");
    });

    //it should hash user password upon registration
    it("deve gerar error notfound se o id não existir", async () => {
      await expect(() =>
        userUseCase.getUserProfile({
          userId: "notExistId",
        })
      ).rejects.toBeInstanceOf(NotFoundError);
    });
  });
});
