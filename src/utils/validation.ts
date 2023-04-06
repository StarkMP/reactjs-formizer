import {
  FieldError,
  FieldRules,
  FieldValue,
  FormValidationRules,
} from '../types';

export const getValidationErrors = (
  value: FieldValue,
  rules: FieldRules
): FieldError[] => {
  const errors = [];

  const maxLength = rules[FormValidationRules.MaxLength];
  const minLength = rules[FormValidationRules.MinLength];
  const pattern = rules[FormValidationRules.Pattern];
  const customFn = rules[FormValidationRules.Custom];

  if (rules[FormValidationRules.Required] == true && value === '') {
    errors.push(FormValidationRules.Required);
  }

  if (maxLength !== undefined && value.length > maxLength) {
    errors.push(FormValidationRules.MaxLength);
  }

  if (minLength !== undefined && value.length < minLength) {
    errors.push(FormValidationRules.MinLength);
  }

  if (pattern !== undefined && new RegExp(pattern).test(value) === false) {
    errors.push(FormValidationRules.Pattern);
  }

  if (customFn !== undefined && customFn(value) !== true) {
    errors.push(FormValidationRules.Custom);
  }

  return errors;
};
