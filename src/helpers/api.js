import axios from "axios";

export const fetchTimezones = async () =>
  await axios.get("http://worldtimeapi.org/api/timezone");

export const fetchSpecificTimezone = async (zone) =>
  await axios.get(`http://worldtimeapi.org/api/timezone/${zone}`);
