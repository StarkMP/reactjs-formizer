import { useRef, useState } from 'react';

import {
  FieldError,
  FieldsData,
  FieldValue,
  FormRegister,
  FormValues,
  UseFormizerParams,
} from '../types';

export const useFormizer = <A extends FormValues>(): UseFormizerParams<A> => {
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

  const getValue = <T extends keyof A>(name: T & string): A[T] => {
    return fieldsRef.current.values[name] as A[T];
  };

  const setValue = <T extends keyof A>(name: T & string, value: A[T]): void => {
    if (!setValueRef.current) {
      return;
    }

    setValueRef.current(name, value);
  };

  const getErrors = <T extends keyof A>(name: T & string): FieldError[] => {
    return fieldsRef.current.errors[name];
  };

  return {
    register,
    getValue,
    setValue,
    getErrors,
  };
};
