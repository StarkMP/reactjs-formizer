import React, {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useRef,
} from 'react';

import {
  fieldsReducer,
  initRules as initRulesAction,
  updateErrors as updateErrorsAction,
  updateValue as updateValueAction,
} from '../reducers/fields';
import {
  FieldError,
  FieldRules,
  FieldsChangeHandler,
  FieldValue,
  FormFields,
} from '../types';
import { formatFieldsData } from '../utils/format';

export type FormContextProps = {
  updateValue: (name: string, value: FieldValue) => void;
  updateErrors: (name: string, errors: FieldError[]) => void;
  initRules: (name: string, rules: FieldRules) => void;
  onFieldChange: (
    name: string,
    data: { value: FieldValue; errors: FieldError[] }
  ) => void;
  fields: FormFields;
};

const Context = createContext<FormContextProps>({} as FormContextProps);

export const FormContext = Context;

export const FormProvider: React.FC<{
  onFieldsChange?: FieldsChangeHandler;
  children: ReactNode;
}> = ({ onFieldsChange, children }) => {
  const [fields, dispatch] = useReducer(fieldsReducer, {});

  const updateValue = (name: string, value: FieldValue): void => {
    dispatch(updateValueAction(name, value));
  };

  const updateErrors = (name: string, errorsArray: FieldError[]): void => {
    dispatch(updateErrorsAction(name, errorsArray));
  };

  const initRules = (name: string, rules: FieldRules): void => {
    dispatch(initRulesAction(name, rules));
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

  return (
    <FormContext.Provider
      value={{
        updateValue,
        updateErrors,
        initRules,
        onFieldChange,
        fields,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
