export function urlSpliter(url) {
  return url.split("/");
}

export function firstUpperCaseOnly(text) {
  text = text.toLowerCase();
  const formattedString = text.charAt(0).toUpperCase() + text.slice(1);
  return formattedString;
}

export function removeSpacebarASCILL(text) {
  let letterArray = text.split("%20");
  letterArray = letterArray.map((letter) => firstUpperCaseOnly(letter));

  let formattedString = "";
  for (let index = 0; index < letterArray.length; ++index) {
    formattedString = formattedString + letterArray[index];
    if (index !== letterArray.length - 1)
      formattedString = formattedString + " ";
  }
  return formattedString;
}

export function isEqualObject(obj1, obj2) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }
  for (let key in obj1) {
    if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
}

export function isEqualDate(date1, date2) {
  const cmpd = (d1, d2, field) => d1[field]() === d2[field]();

  return (
    cmpd(date1, date2, "getDate") &&
    cmpd(date1, date2, "getMonth") &&
    cmpd(date1, date2, "getFullYear")
  );
}

export function compareDate(date1, startTimeOfDate1, date2) {
  const [hour, min] = startTimeOfDate1.split(":");

  date1.setHours(hour, min, 0);
  date2.setSeconds(0);
  date2.setMilliseconds(0);

  if (date1.getTime() === date2.getTime()) {
    return 0;
  } else if (date1 < date2) {
    return -1;
  } else {
    return 1;
  }
}

export function isSameWeek(dateToCheck, today) {
  const startOfWeek = new Date(today);
  const toDate = today.getDate();
  const toDay = today.getDay();

  toDay
    ? startOfWeek.setDate(toDate - toDay + 1)
    : startOfWeek.setDate(toDate - 6);

  startOfWeek.setHours(0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);
  endOfWeek.setHours(0, 0, 0);

  return dateToCheck >= startOfWeek && dateToCheck <= endOfWeek;
}

export function formatDateDisplay(date) {
  return ` ${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()} `;
}

export function formatHourDisplay(date) {
  let hour = date.getHours();
  let minute = date.getMinutes();

  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  return ` ${hour}:${minute} `;
}

export function formatDateAsYMD(date) {
  if (typeof date === "string") {
    const [day, month, year] = date.split("-");
    return `${year}-${month}-${day}`;
  }
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatPeriod(startDate, endDate) {
  return startDate + " - " + endDate;
}

export function formatLocation(locations) {
  return (
    locations.officeName +
    ", " +
    locations.street +
    ", " +
    locations.district +
    ", " +
    locations.city +
    ", " +
    locations.country
  );
}

export function compareDateWithToday(date) {
  let formatedDate = new Date(date);
  const todayDate = new Date();
  return formatedDate <= todayDate;
}

export function setDMYtoYMD(date) {
  let dateToarr = date ? date.split("-") : ["01", "01", "2000"];
  return dateToarr[2] + "-" + dateToarr[1] + "-" + dateToarr[0];
}

export function greaterDatethanToday(date) {
  let dateToarr = date ? date.split("-") : ["01", "01", "2000"];
  let YMD = dateToarr[2] + "-" + dateToarr[1] + "-" + dateToarr[0];

  let formatedDate = new Date(YMD);
  const todayDate = new Date();
  return formatedDate > todayDate;
}

export function lessDatethanToday(date) {
  let dateToarr = date ? date.split("-") : ["01", "01", "2000"];
  let YMD = dateToarr[2] + "-" + dateToarr[1] + "-" + dateToarr[0];

  let formatedDate = new Date(YMD);
  const todayDate = new Date();
  return formatedDate < todayDate;
}

export function getDMYfromFullDate(date) {
  const formattedFullDate = new Date(date);
  const formattedDay =
    (formattedFullDate.getDate() < 10 ? "0" : "") +
    formattedFullDate.getDate().toString();
  const formattedMonth =
    (formattedFullDate.getMonth() + 1 < 10 ? "0" : "") +
    (formattedFullDate.getMonth() + 1).toString();
  return (
    formattedFullDate.getFullYear() + "-" + formattedMonth + "-" + formattedDay
  );
}

export function getFullName(lastName, firstName) {
  if (!(lastName || firstName)) return null;
  else return (lastName ?? "") + " " + (firstName ?? "");
}

export function convertYMDtoDMY(dateStr) {
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
}
