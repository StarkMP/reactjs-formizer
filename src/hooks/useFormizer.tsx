import { useRef, useState } from 'react';

import { FieldError, FieldsData, FieldValue, FormRegister } from '../types';

type UseFormizerParams = {
  register: FormRegister;
  getValue: (name: string) => FieldValue;
  setValue: (name: string, value: FieldValue) => void;
  getErrors: (name: string) => FieldError[];
};

export const useFormizer = <
  T extends { [name: string]: FieldValue }
>(): UseFormizerParams => {
  // hack for force render
  const [, setState] = useState(false);

  const fieldsRef = useRef<FieldsData>({ errors: {}, values: {} });
  const setValueRef = useRef<(name: string, value: FieldValue) => void>();

  const register: FormRegister = (data, changeValue) => {
    setValueRef.current = changeValue;
    fieldsRef.current.values = data.values;
    fieldsRef.current.errors = data.errors;

    setState((prev) => !prev);
  };

  const getValue = (name: string): FieldValue => {
    return fieldsRef.current.values[name];
  };

  const setValue = (name: string, value: FieldValue): void => {
    if (!setValueRef.current) {
      return;
    }

    setValueRef.current(name, value);
  };

  const getErrors = (name: string): FieldError[] => {
    return fieldsRef.current.errors[name];
  };

  return {
    register,
    getValue,
    setValue,
    getErrors,
  };
};
