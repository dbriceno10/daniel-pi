export const capitalizeString = (string) =>
  string.replace(/^\w/, (c) => c.toUpperCase());

export const capitalizeStringWithTrim = (string) =>
  string.trim().replace(/^\w/, (c) => c.toUpperCase());

//Capitaliza cada palabra de un texto
export const capitalizeText = (string) =>
  string.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));

export const capitalizeTextMixedCase = (string) =>
  string
    .trim()
    .toLowerCase()
    .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));

export const urlPatternValidation = (URL) => {
  const regex = new RegExp(/(https?:\/\/.*\.(?:png|jpg))/);
  return regex.test(URL);
};
