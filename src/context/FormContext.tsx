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
  updateErrors as updateErrorsAction,
  updateValue as updateValueAction,
} from '../reducers/fields';
import {
  FieldError,
  FieldInitParams,
  FieldsChangeHandler,
  FieldValue,
  FormFields,
  FormRegister,
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
  set: (name: string, value: FieldValue) => void;
  fields: FormFields;
};

const Context = createContext<FormContextProps>({} as FormContextProps);

export const FormContext = Context;

export const FormProvider: React.FC<{
  onFieldsChange?: FieldsChangeHandler;
  onReset: () => void;
  register?: FormRegister;
  children: ReactNode;
}> = ({ onFieldsChange, onReset, register, children }) => {
  const [fields, dispatch] = useReducer(fieldsReducer, {});
  const fieldsRef = useRef<FormFields>({});

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
      formatFieldsData({
        ...fieldsRef.current,
        [name]: { ...prevField, value, errors },
      })
    );
  };

  const reset = (): void => {
    Object.keys(fields).forEach((name) => {
      fields[name].reset();
    });

    onReset();
  };

  const set = (name: string, value: FieldValue): void => {
    if (!fields[name]) {
      return;
    }

    fields[name].set(value);
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
