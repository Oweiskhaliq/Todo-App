import validator from "validator";
import isLocalEmpty from "./isLocalEmpty.js";

const validateAddTodoInput = (data) => {
  const errors = {};

  data.title = !isLocalEmpty(data.title) ? data.title : "";

  if (!validator.isLength(data.title, { min: 2, max: 40 })) {
    errors.title = "title must be grater then 2 character.";
  }

  if (validator.isEmpty(data.title)) {
    errors.title = "title is Required.";
  }

  return {
    errors,
    isValid: isLocalEmpty(errors),
  };
};

export default validateAddTodoInput;
