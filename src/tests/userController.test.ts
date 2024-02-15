import { MongoMemoryServer } from "mongodb-memory-server";
import * as supertest from "supertest";
import config from "../config/configuration";
import Server from "../Server";
import Database from "../libs/Database";

describe("For user endpoints", () => {
  const email = "aman@gmail.com";
  let ID;
  const server = new Server(config);
  let mongoServer;
  let mongoUri;
  let req;
  let token;

  beforeAll(async () => {
    const app = await server.bootstrap();
    req = supertest(app);

    mongoServer = await MongoMemoryServer.create({
      instance: {
        dbName: "user-contacts-list",
      },
    });
    mongoUri = mongoServer.getUri();

    await Database.open(mongoUri);

    const res = await req.post(`/api/user-contacts-list/login`).send({
      email
    });
    token = res.body.data;
    console.log("token", token);
  });

  describe("Positive Test cases", () => {
    test("In create contact", async () => {
      const newUser = {
        name: "abc",
        email: "abc@gmail.com",
      };
      const res = await req
        .post(`/api/user-contacts-list`)
        .set("Authorization", token)
        .send(newUser);
      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe(newUser.name);
      expect(res.body.data.email).toBe(newUser.email);
      ID = res.body.originalId;
    });

    test("In getAll contacts", async () => {
      const res = await req.get(`/api/user-contacts-list`).set("Authorization", token);
      expect(res.status).toBe(200);
      expect(res.body.data).not.toBeUndefined();
    });

    test("In update contact", async () => {
      const updateUser = {
        originalId: `${ID}`,
        name: "Arjun",
        email: "ar@gmail.com",
        phoneNumber: "0000000001",
      };
      const res = await req
        .put(`/api/user-contacts-list`)
        .set("Authorization", token)
        .send(updateUser);
      expect(res.status).toBe(200);
      expect(res.body.data.originalId).toBe(`${ID}`);
    });

    test("in Delete", async () => {
      const res = await req
        .delete(`/api/user-contacts-list/${ID}`)
        .set("Authorization", token);
      expect(res.status).toBe(200);
      expect(res.body.message).toBe("User deleted Successfully");
    });
  });

  afterAll(async () => {
    Database.disconnect();
  });
});