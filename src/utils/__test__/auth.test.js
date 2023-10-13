import { beforeEach, describe, expect, it } from "vitest";
import { clearLS, getAccessTokenFromLS, setAccessTokenToLS } from "../auth";

const access_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjEiLCJpYXQiOjE2OTExNjU2MDEsImV4cCI6MTY5MTI1MjAwMX0.2kXHMBBPkQuAjo-qZuTFHX19_lWgSy__HDZY8QSNO6U";

beforeEach(() => {
  localStorage.clear();
});

describe("setAccessTokenToLS", () => {
  it("access_token được set vào localStorage"),
    () => {
      setAccessTokenToLS(access_token);
      expect(getAccessTokenFromLS()).toBe(access_token);
    };
});

describe("clearLS", () => {
  it("Xóa hết access_token", () => {
    setAccessTokenToLS(access_token);
    clearLS();
    expect(getAccessTokenFromLS()).toBe("");
  });
});
