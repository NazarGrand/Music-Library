import { isValueValid } from "./isValueValid";

export const patternEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const patternPassword = /^(?=.*\d).{6,}$/;

export function isFieldEmpty(
  name,
  value,
  fieldName,
  setErrors,
  errors,
  message
) {
  if (!value.trim()) {
    setErrors({ ...errors, [name]: `${fieldName} ${message}!` });
    return true;
  }
  return false;
}

export function isFieldValid(pattern, name, value, message, setErrors, errors) {
  if (pattern && !isValueValid(pattern, value)) {
    setErrors({
      ...errors,
      [name]: message,
    });
    return false;
  }
  return true;
}

export function isStateEmpty(state, nameState, name, newError, message) {
  if (state === "") {
    newError[[nameState]] = `${name} ${message}!`;
  }
}
