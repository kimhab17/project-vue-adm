import { reactive } from "vue";
export function useRequiredValidator() {
  const errors = reactive({});
  console.log("error validator:", errors);
  const validateField = (field, value, message) => {
    errors[field] = value ? "" : message;
    return !errors[field];
  };
  return { errors, validateField };
}
