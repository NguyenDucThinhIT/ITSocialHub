import { describe, expect, it } from "vitest";

import {
  validateName,
  validatePhone,
  validateEmail,
  validateBirthday,
  validateAddress,
  validateImage,
  validateJob,
  validateMajor,
  validateUniversity,
  validateBeginYear,
  validateEndYear,
  validateYearRange,
  validateGPA,
} from "./Validated";

describe("Validation Functions", () => {
  it("validateName should return true for valid names", () => {
    expect(validateName("Nguyen Duc Thinh")).toBe(true);
  });

  it("validateName should return false for invalid names", () => {
    expect(validateName("Thinh2405")).toBe(false);
  });

  it("validatePhone should return true for valid phone numbers", () => {
    expect(validatePhone("0368321012")).toBe(true);
  });

  it("validatePhone should return false for invalid phone numbers", () => {
    expect(validatePhone("1234567890")).toBe(false);
  });

  it("validateEmail should return true for valid email addresses", () => {
    expect(validateEmail("thinhbeo@example.com")).toBe(true);
  });

  it("validateEmail should return false for invalid email addresses", () => {
    expect(validateEmail("thinhbeo@gmail@com")).toBe(false);
  });

  it("validateBirthday should return true for valid birthdays", () => {
    expect(validateBirthday("24-05-2002")).toBe(true);
  });

  it("validateBirthday should return false for future birthdays", () => {
    expect(validateBirthday("24-05-2024")).toBe(false);
  });

  it("validateAddress should return true for valid addresses", () => {
    expect(validateAddress("Quan 9, Thanh pho Ho Chi Minh")).toBe(true);
  });

  it("validateAddress should return false for invalid addresses", () => {
    expect(validateAddress("Quan 9@HCM&&")).toBe(false);
  });
  it("validateImage should return true for valid image files", () => {
    expect(validateImage({ name: "thinhbeo.jpg" })).toBe(true);
  });

  it("validateImage should return false for non-image files", () => {
    expect(validateImage({ name: "thinhbeo.pdf" })).toBe(false);
  });

  it("validateJob should return true for valid job names", () => {
    expect(validateJob("Frontend Developer")).toBe(true);
  });

  it("validateJob should return false for invalid job names", () => {
    expect(validateJob("FECredit123")).toBe(false);
  });

  it("validateMajor should return true for valid major names", () => {
    expect(validateMajor("Cong Nghe Thong Tin")).toBe(true);
  });

  it("validateMajor should return false for invalid major names", () => {
    expect(validateMajor("Cong Nghe && Thong Tin")).toBe(false);
  });

  it("validateUniversity should return true for valid university names", () => {
    expect(validateUniversity("SPKT")).toBe(true);
  });

  it("validateUniversity should return false for invalid university names", () => {
    expect(validateUniversity("SP && KT")).toBe(false);
  });

  it("validateBeginYear should return true for valid beginning years", () => {
    expect(validateBeginYear("01-2020")).toBe(true);
  });

  it("validateBeginYear should return false for future beginning years", () => {
    expect(validateBeginYear("12-2100")).toBe(false);
  });

  it("validateEndYear should return true for valid ending years", () => {
    expect(validateEndYear("06-2023")).toBe(true);
  });

  it("validateEndYear should return false for future ending years", () => {
    expect(validateEndYear("12-2025")).toBe(false);
  });

  it("validateYearRange should return true for valid year ranges", () => {
    expect(validateYearRange("06-2020", "06-2023")).toBe(true);
  });

  it("validateYearRange should return false for invalid year ranges", () => {
    expect(validateYearRange("06-2025", "06-2023")).toBe(false);
  });

  it("validateGPA should return true for valid GPAs", () => {
    expect(validateGPA("3.5")).toBe(true);
  });

  it("validateGPA should return false for invalid GPAs", () => {
    expect(validateGPA("4.5")).toBe(false);
  });
});
