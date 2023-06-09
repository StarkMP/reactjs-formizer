import { FieldsData, FormErrors, FormFields, FormValues } from '../types';

export const formatFieldsData = (fields: FormFields): FieldsData => {
  const values: FormValues = {};
  const errors: FormErrors = {};

  Object.keys(fields).forEach((name) => {
    values[name] = fields[name].value;
    errors[name] = fields[name].errors;
  });

  return { values, errors };
};
