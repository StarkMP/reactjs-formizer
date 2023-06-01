import type { InputHTMLAttributes, SyntheticEvent } from 'react';

export type FieldValue = string | number | boolean | File[] | null;

export type FieldError = string;

export type FieldData = {
  type: string;
  defaultValue: FieldValue;
  value: FieldValue;
  errors: FieldError[];
  rules: FieldRules;
  onReset?: FieldResetHandler;
};

export type FieldInitData = {
  type: string;
  defaultValue: FieldValue;
  errors?: FieldError[];
  rules?: FieldRules;
  onReset?: FieldResetHandler;
};

export type FormFields = { [fieldName: string]: FieldData };

export type FormValues = { [fieldName: string]: FieldValue };

export type FormErrors = { [fieldName: string]: FieldError[] };

export type FormRegister = (data: FieldsData, changeValue: any) => void;

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

export type UseFormizerParams<A> = {
  register: FormRegister;
  getValue: <T extends keyof A>(name: T & string) => A[T];
  setValue: <T extends keyof A>(name: T & string, value: A[T]) => void;
  getErrors: <T extends keyof A>(name: T & string) => FieldError[];
};

export type TextInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'name' | 'value' | 'type'
> & {
  type:
    | 'text'
    | 'password'
    | 'email'
    | 'search'
    | 'tel'
    | 'url'
    | 'date'
    | 'datetime-local'
    | 'month'
    | 'week'
    | 'color'
    | 'time';
  name: string;
  value?: string;
  custom?: FieldCustomValidationRule;
};

export type NumericInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'name' | 'value' | 'type'
> & {
  type: 'number' | 'range';
  name: string;
  value?: number;
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

export type FileInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'name' | 'value' | 'type'
> & {
  name: string;
  type: 'file';
  custom?: FieldCustomValidationRule;
};
