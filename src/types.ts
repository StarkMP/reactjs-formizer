import type { InputHTMLAttributes, SyntheticEvent } from 'react';

export type FieldValue = string | number | boolean | undefined;
export type FieldError = string;

export type FieldData = {
  value: FieldValue;
  errors: FieldError[];
  rules: FieldRules;
  reset: FieldResetHandler;
  set: FieldSetHandler;
};

export type FormFields = { [fieldName: string]: FieldData };

export type FormValues = { [fieldName: string]: FieldValue };
export type FormErrors = { [fieldName: string]: FieldError[] };

export type FormRegister = (data: FieldsData, changeValue: any) => void;

export type FieldsData = {
  errors: FormErrors;
  values: FormValues;
};

export type FieldInitParams = {
  rules: FieldRules;
  reset: FieldResetHandler;
  set: FieldSetHandler;
};

export enum FormValidationRules {
  Required = 'required',
  MaxLength = 'max-length',
  MinLength = 'min-length',
  Pattern = 'pattern',
  Custom = 'custom',
}

export type FieldCustomValidationRule = (value: FieldValue) => boolean | string;

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
export type FieldResetHandler = () => void;
export type FieldSetHandler = (value: FieldValue) => void;

export type TextInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'name' | 'value' | 'type'
> & {
  type:
    | 'text'
    | 'password'
    | 'number'
    | 'email'
    | 'search'
    | 'tel'
    | 'url'
    | 'date'
    | 'datetime-local'
    | 'month'
    | 'week'
    | 'range'
    | 'color'
    | 'time';
  name: string;
  value?: string;
  custom?: FieldCustomValidationRule;
};

export type RadioInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'name' | 'value' | 'type'
> & {
  type: 'radio';
  name: string;
  value: string;
  custom?: FieldCustomValidationRule;
};

export type CheckboxInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'name' | 'value' | 'type'
> & {
  type: 'checkbox';
  name: string;
  custom?: FieldCustomValidationRule;
};

export type ResetInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'name' | 'value' | 'type'
> & {
  type: 'reset';
  value?: string;
  custom?: FieldCustomValidationRule;
};

export type HiddenInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'name' | 'value' | 'type' | 'onReset'
> & {
  name: string;
  type: 'hidden';
  value?: string;
  onReset?: () => void;
  custom?: FieldCustomValidationRule;
};
