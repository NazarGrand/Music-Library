export const isValueValid = (pattern, value) => {
  if (!pattern.test(value) && value.trim() !== "") {
    return false;
  }
  return true;
};
