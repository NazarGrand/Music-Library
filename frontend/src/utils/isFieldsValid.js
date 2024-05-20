import { isValueValid } from "./isValueValid";

export const patternEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const patternPassword = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,}$/;

export function isFieldEmpty(name, value, fieldName, setErrors, errors) {
  if (!value.trim()) {
    setErrors({ ...errors, [name]: `${fieldName} is required!` });
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

export function isStateEmpty(state, nameState, newError) {
  if (state === "") {
    const name = nameState.charAt(0).toUpperCase() + nameState.slice(1);

    newError[[nameState]] = `${name} is required!`;
  }
}
