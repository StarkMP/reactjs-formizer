import React, {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useRef,
} from 'react';

import {
  fieldsReducer,
  initialize as initializeAction,
  reset as resetAction,
  updateErrors as updateErrorsAction,
  updateValue as updateValueAction,
} from '../reducers/fields';
import {
  FieldError,
  FieldInitData,
  FieldsChangeHandler,
  FieldValue,
  FormFields,
  FormRegister,
} from '../types';
import { formatFieldsData } from '../utils/format';

export type FormContextProps = {
  updateValue: (name: string, value: FieldValue) => void;
  updateErrors: (name: string, errors: FieldError[]) => void;
  initialize: (name: string, params: FieldInitData) => void;
  onFieldChange: (
    name: string,
    data: { value: FieldValue; errors: FieldError[] }
  ) => void;
  reset: () => void;
  set: (name: string, value: FieldValue) => void;
  fields: FormFields;
};

const Context = createContext<FormContextProps>({} as FormContextProps);

export const FormContext = Context;

export const FormProvider: React.FC<{
  onFieldsChange?: FieldsChangeHandler;
  register?: FormRegister;
  children: ReactNode;
}> = ({ onFieldsChange, register, children }) => {
  const [fields, dispatch] = useReducer(fieldsReducer, {});
  const fieldsRef = useRef<FormFields>({});

  const updateValue = (name: string, value: FieldValue): void => {
    dispatch(updateValueAction(name, value));
  };

  const updateErrors = (name: string, errorsArray: FieldError[]): void => {
    dispatch(updateErrorsAction(name, errorsArray));
  };

  const initialize = (name: string, params: FieldInitData): void => {
    dispatch(initializeAction(name, params));
  };

  const onFieldChange = (
    name: string,
    { value, errors }: { value: FieldValue; errors: FieldError[] }
  ): void => {
    if (!onFieldsChange) {
      return;
    }

    const prevField = fields[name];

    onFieldsChange(
      formatFieldsData({
        ...fieldsRef.current,
        [name]: { ...prevField, value, errors },
      })
    );
  };

  const reset = (): void => {
    dispatch(resetAction());
  };

  const set = (name: string, value: FieldValue): void => {
    const currentField = fields[name];

    if (!currentField) {
      return;
    }

    updateValue(name, value);
  };

  useEffect(() => {
    if (register) {
      register(formatFieldsData(fields), set);
    }

    fieldsRef.current = fields;
  }, [fields]);

  return (
    <FormContext.Provider
      value={{
        updateValue,
        updateErrors,
        initialize,
        onFieldChange,
        reset,
        set,
        fields,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
