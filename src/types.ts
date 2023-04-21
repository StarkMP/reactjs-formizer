import type { SyntheticEvent } from 'react';

export type FieldValue = string | number | readonly string[] | undefined;
export type FieldError = string;

export type FieldData = {
  value: FieldValue;
  errors: FieldError[];
  rules: FieldRules;
};

export type FormFields = { [fieldName: string]: FieldData };

export type FormValues = { [fieldName: string]: FieldValue };
export type FormErrors = { [fieldName: string]: FieldError[] };

export type FieldsData = {
  errors: FormErrors;
  values: FormValues;
};

export enum FormValidationRules {
  Required = 'required',
  MaxLength = 'max-length',
  MinLength = 'min-length',
  Pattern = 'pattern',
  Custom = 'custom',
}

export type FieldCustomValidationRule = (value: FieldValue) => boolean;

export type FieldRules = {
  [FormValidationRules.Required]?: boolean;
  [FormValidationRules.MaxLength]?: number;
  [FormValidationRules.MinLength]?: number;
  [FormValidationRules.Pattern]?: string;
  [FormValidationRules.Custom]?: FieldCustomValidationRule;
};

export type SubmitHandlerParams = {
  event: SyntheticEvent;
  data: FieldsData;
};

export type SubmitHandler = (params: SubmitHandlerParams) => void;
export type ValidationFailedHandler = (params: SubmitHandlerParams) => void;
export type FieldsChangeHandler = (data: FieldsData) => void;
