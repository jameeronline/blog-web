// This file contains the following utility functions:
// 1. reverseString: Reverses the given string.
// 2. sluggify: Converts a string into a URL-friendly slug.
// 3. capitalize: Capitalizes the first letter of the given string.
// 4. isArrayNotEmpty: Checks if the given array is not empty.

export function reverseString(str) {
  return str.split("").reverse().join("");
}

export function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, "") // remove invalid characters
    .replace(/\s+/g, "-") // replace spaces with -
    .replace(/-+/g, "-"); // replace multiple - with single -
}

export function slug(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, "") // remove invalid characters
    .replace(/\s+/g, "-") // replace spaces with -
    .replace(/-+/g, "-"); // replace multiple - with single -
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isArrayNotEmpty(arr) {
  return Array.isArray(arr) && arr.length > 0;
}

// This function removes duplicates from an array in JavaScript.
export function removeDuplicates(arr) {
  return [...new Set(arr)];
}

//captialize first letter of each word in a string
export function capitalizeString(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// This function formats a date string to "Day, d M yyyy".
export function formatDateString(dateString) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options).replace(/,/g, "");
}

// This function converts an array of objects into a string of names prefixed with '#'.
export function convertArrayToString(arr) {
  if (Array.isArray(arr) && arr.length > 0) {
    return arr.map((item) => `#${item.title}`).join(", ");
  }
}
