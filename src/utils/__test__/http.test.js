import http from "../http";
import { beforeEach, describe, expect, it } from "vitest";

describe("http axios", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it("Gọi API", async () => {
    const res = await http.get("job-posts/search");
    expect(res.status).equal(200);
  });

  it("Auth Request", async () => {
    await http.post("auth/login", {
      username: "admin2",
      password: "Admin2",
    });
    const res = await http.get("accounts");
    expect(res.status).equal(200);
  });
});
