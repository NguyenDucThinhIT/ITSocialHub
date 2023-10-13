import { describe, expect, it } from "vitest";

import {
  firstUpperCaseOnly,
  formatLocation,
  getFullName,
  greaterDatethanToday,
  isEqualObject,
  lessDatethanToday,
  removeSpacebarASCILL,
  urlSpliter,
} from "../SomeUtils";

describe("firstUpperCaseOnly", () => {
  it("firstUpperCaseOnly hoạt động tốt", () => {
    expect(firstUpperCaseOnly("abcsad")).toEqual("Abcsad");
  });
});

describe("urlSpliter", () => {
  it("urlSpliter hoạt động tốt", () => {
    expect(urlSpliter("abcsad/dsadasdas")).toEqual(["abcsad", "dsadasdas"]);
  });
});

describe("removeSpacebarASCILL", () => {
  it("removeSpacebarASCILL hoạt động tốt", () => {
    expect(removeSpacebarASCILL("Nguyen Huu Ngoc Vinh")).toEqual(
      "Nguyen huu ngoc vinh"
    );
  });
});

describe("isEqualObject", () => {
  it("isEqualObject hoạt động tốt", () => {
    expect(
      isEqualObject({ name: "vinh", age: 22 }, { name: "vinh", age: 22 })
    ).toEqual(true);
  });
});

describe("lessDatethanToday", () => {
  it("lessDatethanToday hoạt động tốt", () => {
    expect(lessDatethanToday("04-08-2023")).toEqual(true);
  });
});

describe("greaterDatethanToday", () => {
  it("greaterDatethanToday hoạt động tốt", () => {
    expect(greaterDatethanToday("07-08-2023")).toEqual(true);
  });
});

describe("formatLocation", () => {
  it("formatLocation hoạt động tốt", () => {
    expect(
      formatLocation({
        id: 5,
        officeName: "Office 5",
        street: "Street 5",
        district: "District 5",
        city: "City 5",
        country: "Country 5",
      })
    ).toEqual("Office 5, Street 5, District 5, City 5, Country 5");
  });
});

describe("getFullName", () => {
  it("getFullName hoạt động tốt", () => {
    expect(getFullName("Nguyen", "Vinh")).toEqual("Nguyen Vinh");
  });
});
