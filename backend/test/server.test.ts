import Prisma from "../src/db";
import { server } from "../src/server";

describe("server test", () => {
  it("should assert 1 + 1 is 2", () => {
    expect(1 + 1).toEqual(2);
  });

  beforeAll(async () => {
    await server.ready();
  });

  beforeEach(async () => {
    await Prisma.entry.deleteMany({});
    await server.inject({
      method: "POST",
      url: "/create/",
      payload: { title: "testTitle1", description: "desc1", created_at: new Date(), scheduled_date: new Date() },
    });
    await server.inject({
      method: "POST",
      url: "/create/",
      payload: { title: "testTitle2", description: "desc2", created_at: new Date(), scheduled_date: new Date() },
    });
  });

  afterAll(async () => {
    await server.close();
    await Prisma.$disconnect();
  });

  test("get all entries", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/get/",
    });
    expect(response.statusCode).toBe(200);
    expect(response.json().length).toBe(2);
  });

  test("add new entry", async () => {
    await server.inject({
      method: "POST",
      url: "/create/",
      payload: { title: "testTitle3", description: "desc3", created_at: new Date(), scheduled_date: new Date() },
    });
    const response = await server.inject({
      method: "GET",
      url: "/get/",
    });
    expect(response.statusCode).toBe(200);
    expect(response.json().length).toBe(3);
  });

  test("get entry with id", async () => {
    const idResponse = await server.inject({
      method: "GET",
      url: "/get/",
    });
    const id = idResponse.json()[0].id;
    const idObject = await server.inject({
      method: "GET",
      url: `/get/${id}`,
    });
    console.log("idobj", idObject.json().id);
    expect(idResponse.statusCode).toBe(200);
    expect(idObject.json().id).toBe(id);
  });

  test("edit entry", async () => {
    const idResponse = await server.inject({
      method: "GET",
      url: "/get/",
    });
    const id = idResponse.json()[0].id;
    const testTitle = "AUTOMATED TEST TITLE";
    const x = await server.inject({
      method: "PUT",
      url: `/update/${id}`,
      payload: { title: testTitle, description: "desc3", created_at: new Date(), scheduled_date: new Date() },
    });
    console.log("x", x);
    const idObject = await server.inject({
      method: "GET",
      url: `/get/${id}`,
    });
    expect(idResponse.statusCode).toBe(200);
    expect(idObject.json().title).toBe(testTitle);
  });

  test("delete entry with id", async () => {
    const idResponse = await server.inject({
      method: "GET",
      url: "/get/",
    });
    const id = idResponse.json()[0].id;
    const deleteResponse = await server.inject({
      method: "DELETE",
      url: `/delete/${id}`,
    });
    expect(deleteResponse.statusCode).toBe(200);
    expect(deleteResponse.json().msg).toBe("Deleted successfully");
  });
});
