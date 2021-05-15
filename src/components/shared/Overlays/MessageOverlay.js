import React from "react";
import css from "./MessageOverlay.module.css";

const MessageOverlay = ({ message, onClose }) =>
  <div className={css.message} onClick={onClose}>{message}</div>

export default MessageOverlay;
