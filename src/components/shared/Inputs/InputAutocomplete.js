import React from "react";
import css from "./InputAutocomplete.module.css";

const InputAutoComplete = ({ data, isLoading, variant, ...rest }) => (
  <>
    <input
      className={`${variant === "none" ? css.none : css.input}`}
      {...rest}
      list="timezones"
      name="timezone"
      autoComplete="off"
    />
    <datalist id="timezones">
      {data &&
        data.length &&
        data.map((t, i) => (
          <option value={t} key={i}>
            {t}
          </option>
        ))}
    </datalist>
  </>
);

export default InputAutoComplete;
