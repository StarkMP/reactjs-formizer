import React, { createContext, ReactNode, useReducer } from 'react';

import {
  fieldsReducer,
  initialize as initializeAction,
  updateErrors as updateErrorsAction,
  updateValue as updateValueAction,
} from '../reducers/fields';
import {
  FieldError,
  FieldInitParams,
  FieldsChangeHandler,
  FieldValue,
  FormFields,
} from '../types';
import { formatFieldsData } from '../utils/format';

export type FormContextProps = {
  updateValue: (name: string, value: FieldValue) => void;
  updateErrors: (name: string, errors: FieldError[]) => void;
  initialize: (name: string, params: FieldInitParams) => void;
  onFieldChange: (
    name: string,
    data: { value: FieldValue; errors: FieldError[] }
  ) => void;
  reset: () => void;
  fields: FormFields;
};

const Context = createContext<FormContextProps>({} as FormContextProps);

export const FormContext = Context;

export const FormProvider: React.FC<{
  onFieldsChange?: FieldsChangeHandler;
  onReset: () => void;
  children: ReactNode;
}> = ({ onFieldsChange, onReset, children }) => {
  const [fields, dispatch] = useReducer(fieldsReducer, {});

  const updateValue = (name: string, value: FieldValue): void => {
    dispatch(updateValueAction(name, value));
  };

  const updateErrors = (name: string, errorsArray: FieldError[]): void => {
    dispatch(updateErrorsAction(name, errorsArray));
  };

  const initialize = (name: string, params: FieldInitParams): void => {
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
      formatFieldsData({ ...fields, [name]: { ...prevField, value, errors } })
    );
  };

  const reset = (): void => {
    Object.keys(fields).forEach((name) => {
      fields[name].reset();
    });

    onReset();
  };

  return (
    <FormContext.Provider
      value={{
        updateValue,
        updateErrors,
        initialize,
        onFieldChange,
        reset,
        fields,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
