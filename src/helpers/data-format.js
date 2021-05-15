
  export const displayDate = (unixtime) => {
    const date = new Date(unixtime * 1000);
    const fullYear = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const fullMonth = month < 10 ? `0${month}` : month;
    const fullDay = day < 10 ? `0${day}` : day;
    return `${fullDay}-${fullMonth}-${fullYear}`;
  }

  export const formatTime = (unixtime) => {
    const date = new Date(unixtime * 1000);
    return date.toLocaleTimeString();
  }