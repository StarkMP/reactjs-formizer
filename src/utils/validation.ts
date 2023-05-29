import {
  FieldError,
  FieldRules,
  FieldValue,
  FormValidationRules,
} from '../types';

export const getValidationErrors = (
  value: FieldValue,
  rules: FieldRules = {}
): FieldError[] => {
  const errors = [];

  const required = rules[FormValidationRules.Required];
  const maxLength = rules[FormValidationRules.MaxLength];
  const minLength = rules[FormValidationRules.MinLength];
  const pattern = rules[FormValidationRules.Pattern];
  const customFn = rules[FormValidationRules.Custom];

  if (
    required == true &&
    (value === undefined || value === '' || value === false || value === null)
  ) {
    errors.push(FormValidationRules.Required);
  }

  if (customFn !== undefined) {
    const customValidationResult = customFn(value);

    if (
      customValidationResult !== true &&
      typeof customValidationResult === 'string'
    ) {
      errors.push(customValidationResult);
    }
  }

  if (typeof value !== 'string') {
    return errors;
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

  return errors;
};
