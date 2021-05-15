import React from "react";
import css from "./ActionButton.module.css";

const ActionButton = ({
  style,
  size = "medium",
  onClick,
  label,
  disabled,
  variant,
  type,
}) => (
  <button
    type={type}
    style={style}
    className={`${size === "small" ? css.smallButton : css.mediumButton} ${variant === 'none' && css.none}`}
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>
);

export default ActionButton;
