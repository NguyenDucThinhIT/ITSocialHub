const validateName = (firstName) => {
  return /^[a-zA-Z\u00C0-\u1EF9\s]{2,30}$/u.test(firstName);
};
const validateEmail = (email) => {
  return /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
};
const validatePhone = (phone) => {
  const pattern = /^(03|05|07|08|09|01[2689])([0-9]{8})$/;
  return pattern.test(phone);
};

const validateBirthday = (birthday) => {
  const regex = /^(\d{2})-(\d{2})-(\d{4})$/;
  if (!regex.test(birthday)) {
    return false;
  }
  const [day, month, year] = birthday.split("-").map(Number);
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return false;
  }
  const birthDate = new Date(year, month - 1, day);
  const currentDate = new Date();
  return birthDate <= currentDate;
};

const validateAddress = (address) => {
  return /^[a-zA-Z0-9\u00C0-\u1EF9\s/,-]+$/u.test(address);
};
const validateJob = (job) => {
  return /^[a-zA-Z\u00C0-\u1EF9\s&-]+$/u.test(job);
};
const validateMajor = (major) => {
  return /^[a-zA-Z\u00C0-\u1EF9\s/-]+$/u.test(major);
};
const validateUniversity = (university) => {
  return /^[a-zA-Z\u00C0-\u1EF9\s/-]+$/u.test(university);
};
const validateBeginYear = (graduationIn) => {
  const currentYear = new Date().getFullYear();
  const regex = /^(0[1-9]|1[0-2])-(19\d{2}|20\d{2}|21\d{2})$/;
  if (regex.test(graduationIn)) {
    const [month, year] = graduationIn.split("-");
    const inputYear = parseInt(year);
    const inputMonth = parseInt(month);
    const currentMonth = new Date().getMonth() + 1;
    return (
      inputYear < currentYear ||
      (inputYear === currentYear && inputMonth <= currentMonth)
    );
  }
  return false;
};

const validateEndYear = (graduationOut) => {
  const currentYear = new Date().getFullYear();
  const regex = /^(0[1-9]|1[0-2])-(19\d{2}|20\d{2}|21\d{2})$/;
  if (regex.test(graduationOut)) {
    const [month, year] = graduationOut.split("-");
    const inputYear = parseInt(year);
    const inputMonth = parseInt(month);
    const currentMonth = new Date().getMonth() + 1;
    return (
      inputYear < currentYear ||
      (inputYear === currentYear && inputMonth <= currentMonth)
    );
  }
  return false;
};

const validateYearRange = (graduationIn, graduationOut) => {
  const regex = /^(0[1-9]|1[0-2])-(19\d{2}|20\d{2}|21\d{2})$/;
  if (regex.test(graduationIn) && regex.test(graduationOut)) {
    const [startMonth, startYear] = graduationIn.split("-");
    const [endMonth, endYear] = graduationOut.split("-");
    const startYearInt = parseInt(startYear);
    const endYearInt = parseInt(endYear);
    const startMonthInt = parseInt(startMonth);
    const endMonthInt = parseInt(endMonth);

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    if (
      endYearInt > currentYear ||
      (endYearInt === currentYear && endMonthInt > currentMonth)
    ) {
      return false;
    }

    if (startYearInt < endYearInt) {
      return true;
    } else if (startYearInt === endYearInt) {
      return startMonthInt <= endMonthInt;
    } else {
      return false;
    }
  }
  return false;
};

const validateGPA = (gpa) => {
  return /^([0-3](\.\d{1,2})?|4(\.0{1,2})?)$/.test(gpa);
};
const validateRequiredFields = (fields) => {
  for (const field of fields) {
    if (!field || field.trim() === "") {
      return false;
    }
  }
  return true;
};

const validImageExtensions = ["jpg", "jpeg", "png", "gif"];
const validateImage = (file) => {
  const fileExtension = file.name.split(".").pop().toLowerCase();
  return validImageExtensions.includes(fileExtension);
};
const validateGender = (gender) => {
  
  return gender === "MALE" || gender === "FEMALE" || gender === "OTHER" || gender === "UNKNOWN";
};

export {
  validateName,
  validatePhone,
  validateEmail,
  validateBirthday,
  validateAddress,
  validateRequiredFields,
  validateImage,
  validateJob,
  validateMajor,
  validateUniversity,
  validateBeginYear,
  validateEndYear,
  validateYearRange,
  validateGPA,
  validateGender,
};
