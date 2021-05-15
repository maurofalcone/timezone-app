import React, { useCallback, useEffect, useState } from "react";
import { displayDate, formatTime } from "../../../helpers/data-format";
import { fetchSpecificTimezone } from "../../../helpers/api";
import ActionButton from "../Buttons/ActionButton";
import css from "./TimeCard.module.css";
import { REFRESH_INTERVAL } from "../../../helpers/constants";

const resolveResponse = async (timezone, callback) => {
  const result = await fetchSpecificTimezone(timezone);
  if (result.data) {
    callback({
      timezone: result.data.timezone,
      unixtime: result.data.unixtime,
    });
  }
};

const TimeCard = ({ unixtime, timezone, onClose }) => {
  const [currentTimezone, setCurrentTimezone] = useState({
    timezone,
    unixtime,
  });

  const refreshTime = useCallback(() => {
    const refreshInterval = setInterval(() => {
      resolveResponse(timezone, setCurrentTimezone);
    }, REFRESH_INTERVAL);
    return refreshInterval;
  }, [timezone]);

  useEffect(() => {
    const interval = refreshTime();
    return () => clearInterval(interval);
  }, [refreshTime]);

  return (
    <div className={css.container}>
      <b>{timezone}</b>
      <span>{displayDate(currentTimezone.unixtime)}</span>
      <span>{formatTime(currentTimezone.unixtime)}</span>
      <ActionButton size="small" value={timezone} onClick={() => {console.log('here'); onClose()}} label="X" />
    </div>
  );
};
export default TimeCard;
