import {daysInMonth} from "./index";

const homeWorksList = [];

const getRandomNumber = (maxNumber) => {
  return Math.floor(Math.random() * maxNumber);
};

const generateHomeWorksListItem = (id, counter, year, month, day) => {
  const typeWorksList = ['Неповоротная сварка труб', 'Поворотная сварка труб'];
  const subdivisionList = ['СМУ-1', 'СМУ-2', 'СМУ-3', 'СМУ-4'];
  const workShiftList = ['Утро', 'Вечер'];
  const brigadeList = ['Шарло A.A. (Ш-3)', 'Пеккель В.А.'];

  return {
    id: id,
    number: counter,
    typeWorks: typeWorksList[getRandomNumber(typeWorksList.length)],
    subdivision: subdivisionList[getRandomNumber(subdivisionList.length)],
    workShift: workShiftList[getRandomNumber(workShiftList.length)],
    date: {
      day: day,
      month: month,
      year: year
    },
    brigade: brigadeList[getRandomNumber(brigadeList.length)],
    isConfirmed: Math.random() >= 0.5,
    isFault: Math.random() >= 0.5
  }
};

const generateHomeWorksList = (year, month, counterStart) => {
  let id = 0;
  for (let i = 0; i < daysInMonth(month + 1, year) + 1; i++) {
    for (let j = 0; j < Math.floor(Math.random() * 70); j++) {
      const item = generateHomeWorksListItem(id++, counterStart++, year, month, i);
      homeWorksList.push(item);
    }
  }
  for (let i = 0; i < daysInMonth(month, year) + 1; i++) {
    for (let j = 0; j < Math.floor(Math.random() * 70); j++) {
      const item = generateHomeWorksListItem(id++, counterStart++, year, month, i);
      homeWorksList.push(item);
    }
  }
  for (let i = 0; i < daysInMonth(month + 2, year) + 1; i++) {
    for (let j = 0; j < Math.floor(Math.random() * 70); j++) {
      const item = generateHomeWorksListItem(id++, counterStart++, year, month, i);
      homeWorksList.push(item);
    }
  }
  return homeWorksList;
};

export {
  generateHomeWorksList
}
