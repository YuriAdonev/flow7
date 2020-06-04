const daysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

const getMonthName = (month) => {
  const names = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ];
  return names[month];
};

const getMonthNameInline = (month) => {
  const names = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря' ];
  return names[month];
};

const convertTime = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds - (hours * 3600)) / 60);
  const seconds = Math.round(timeInSeconds - (hours * 3600) - (minutes * 60));

  return `${hours > 0 ? hours < 10 ? '0' + hours + ':' : hours + ':' : '00:'}${minutes > 0 ? minutes < 10 ? '0' + minutes + ':' : minutes + ':' : '00:'}${seconds > 0 ? seconds < 10 ? '0' + seconds : seconds : '00'}`;
};

const getPerfectDate = (date) => {
  return `${new Date(date).getDate() < 10 ? '0' + new Date(date).getDate() : new Date(date).getDate()}.${new Date(date).getMonth() < 9 ? '0' + (new Date(date).getMonth() + 1) : new Date(date).getMonth() + 1}.${new Date(date).getFullYear()}`
};

const getStatusString = (id) => {
  switch (id) {
    case 'works':
      return 'Исправен';
    case 'broken':
      return 'Не исправен';
    case 'decommissioned':
      return 'Списан';
    default:
      return ''
  }
};

export {
  daysInMonth,
  getMonthName,
  getMonthNameInline,
  convertTime,
  getPerfectDate,
  getStatusString
}
