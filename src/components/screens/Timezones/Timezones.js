import React, { useCallback, useEffect, useState } from "react";
import TimeCard from "../../shared/Cards/TimeCard";
import InputAutoComplete from "../../shared/Inputs/InputAutocomplete";
import css from "./Timezones.module.css";
import ActionButton from "../../shared/Buttons/ActionButton";
import MessageOverlay from "../../shared/Overlays/MessageOverlay";
import { fetchSpecificTimezone, fetchTimezones } from "../../../helpers/api";

const resolveSpecificTimezoneResponse = async (timezone, data, callback) => {
  const response = await fetchSpecificTimezone(timezone);
  callback([...data, response.data]);
};

const resolveTimezonesResponse = async (callback) => {
  const response = await fetchTimezones();
  callback(response.data);
};

const Timezones = () => {
  const [timezones, saveTimezones] = useState([]);
  const [list, setItem] = useState([]);
  const [inputValue, setValue] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const removeTimezone = useCallback(
    (evt) => setItem(list.filter((t) => t.timezone !== evt.target.value)),
    [list]
  );

  useEffect(() => {
    resolveTimezonesResponse(saveTimezones);
  }, []);

  const handleTimezoneSelection = useCallback((evt) => {
    const selectedTimezone = evt.target.value;
    setValue(selectedTimezone);
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (inputValue && !list.some((i) => i.timezone === inputValue)) {
        setLoading(true);
        setError("");
        await resolveSpecificTimezoneResponse(inputValue, list, setItem);
        setLoading(false);
        clearInput();
      }
    } catch (error) {
      setLoading(false);
      setError("Something went wrong. Please try again");
    }
  };

  const renderTimezones = useCallback(
    () =>
      list.map((t) => (
        <TimeCard
          key={t.timezone}
          unixtime={t.unixtime}
          timezone={t.timezone}
          onClose={removeTimezone}
        />
      )),
    [list, removeTimezone]
  );

  const clearInput = useCallback(() => {
    if (inputValue) {
      setValue("");
    }
  }, [inputValue]);

  const handleFocus = () => {
    clearInput();
  };

  const handleOverlayClose = () => {
    setLoading(false);
    setError("");
  };

  const isDisabled = isLoading || list.length === 3;

  return (
    <div className={css.appContainer}>
      <form onSubmit={handleClick}>
        <InputAutoComplete
          style={{ flex: 1 }}
          data={timezones}
          onChange={handleTimezoneSelection}
          placeholder="Select a timezone"
          value={inputValue}
          onFocus={handleFocus}
          disabled={isDisabled}
          variant="none"
        />
        <ActionButton
          style={{ marginLeft: "auto" }}
          size="medium"
          label="Add"
          disabled={isDisabled}
          type="submit"
        />
      </form>
      <div className={css.container}>{renderTimezones()}</div>
      {(error || isLoading) && (
        <MessageOverlay
          onClose={error && handleOverlayClose}
          message={isLoading ? "Adding Item..." : error}
        />
      )}
      <br />
    </div>
  );
};

export default Timezones;
