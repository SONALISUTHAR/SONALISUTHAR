export function camelCase(str) {
  // Using replace method with regEx
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}
export function firstUpperCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export const validateEmail = (email) => {
  const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};
export const validatePassword = (password) => {
  return password.length >= 8;
};


export const validateField = (value, type, label) => {
  let errorMessage = "";
  if (label) {
    switch (type) {
      case "text":
        if (!value) {
          errorMessage = ` ${label} is required`;
        }
        break;
        case "parent-child":
          if (!value) {
            errorMessage = ` ${label} is required`;
          }
          break;
      case "select":
        if (!value) {
          errorMessage = ` ${label} Please Select Value`;
        }
        break;
      case "simple-select":
        if (!value) {
          errorMessage = ` ${label} Please Select`;
        }
        break;
      case "advance-select":
        if (!value) {
          errorMessage = ` ${label} Please Select`;
        }
        break;
      case "datetime-local":
        if (!value) {
          errorMessage = `${label} Please Select  `;
        }
        break;
      case "checkbox":
        if (!value) {
          errorMessage = `${label} Must be Checked`;
        }
        break;
      case "email":
        if (!value || !validateEmail(value)) {
          errorMessage = `${label} must be a valid email address`;
        }
        break;
      case "password":
        if (!value || !validatePassword(value)) {
          errorMessage = `${label} must be at least 8 characters long`;
        }
        break;
      case "phone":
        if (!value || value.length !== 10) {
          errorMessage = `${label} must be exactly 10 characters`;
        }
        break;

      case "multi-select":
        if (Array.isArray(value)) {
          value.forEach(val => {
            if (typeof val === 'string') {
            }
          });
        } else if (typeof value === 'string') {
          value.trim();
        }
        break;
      default:
        if (!value || !value.trim()) {
          errorMessage = `${label} Is Required`;
        }
    }
  }
  return errorMessage;
};


export const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}