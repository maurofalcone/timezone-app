import { render, screen } from "@testing-library/react";
import App from "./App";
import ActionButton from "./components/shared/Buttons/ActionButton";
import InputAutoComplete from "./components/shared/Inputs/InputAutocomplete";
import MessageOverlay from "./components/shared/Overlays/MessageOverlay";

test("renders button with Add text", () => {
  render(<App />);
  const button = screen.getByText("Add");
  expect(button).toBeInTheDocument();
});

test("<ActionButton disabled />", () => {
  render(<ActionButton label="MyButton" disabled />);
  const button = screen.getByText("MyButton");
  expect(button).toBeDisabled();
});

test("<MessageOverlay disabled />", () => {
  render(<MessageOverlay message="Network Error" />);
  const button = screen.getByText("Network Error");
  expect(button).toHaveTextContent("Network Error");
});

test("<InputAutoComplete  with suggestions/>", () => {
  const timezones = [
    "America/Argentina/Buenos_Aires",
    "America/Argentina/Jujuy",
    "America/Argentina/Catamarca",
  ];
  const { container } = render(<InputAutoComplete data={timezones} />);

  expect(container.getElementsByTagName("option")).toHaveLength(3);
});
