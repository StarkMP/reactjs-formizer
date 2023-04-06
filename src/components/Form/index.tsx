import React, { FormHTMLAttributes, SyntheticEvent, useContext } from 'react';

import { FormContext, FormProvider } from '../../context';
import {
  FieldsChangeHandler,
  FormErrors,
  SubmitHandler,
  ValidationFailedHandler,
} from '../../types';
import { formatFieldsData } from '../../utils/format';
import { getValidationErrors } from '../../utils/validation';

export type FormProps = Omit<
  FormHTMLAttributes<HTMLFormElement>,
  'onSubmit'
> & {
  onValidationFailed?: ValidationFailedHandler;
  onSubmit?: SubmitHandler;
  onFieldsChange?: FieldsChangeHandler;
};

const Form: React.FC<FormProps> = ({
  onSubmit,
  onValidationFailed,
  onFieldsChange,
  children,
  ...other
}) => {
  return (
    <FormProvider onFieldsChange={onFieldsChange}>
      <FormComponent
        {...other}
        onSubmit={onSubmit}
        onValidationFailed={onValidationFailed}
      >
        {children}
      </FormComponent>
    </FormProvider>
  );
};

const FormComponent: React.FC<Omit<FormProps, 'onFieldsChange'>> = ({
  onSubmit,
  onValidationFailed,
  children,
  ...other
}) => {
  const { updateErrors, fields } = useContext(FormContext);

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();

    let isValidationFailed = false;
    const errors: FormErrors = {};

    Object.keys(fields).forEach((name) => {
      errors[name] = getValidationErrors(
        fields[name].value,
        fields[name].rules
      );

      updateErrors(name, errors[name]);

      if (errors[name].length > 0) {
        isValidationFailed = true;
      }
    });

    if (isValidationFailed) {
      if (onValidationFailed) {
        onValidationFailed({
          event: e,
          data: { ...formatFieldsData(fields), errors },
        });
      }

      return;
    }

    if (onSubmit) {
      onSubmit({ event: e, data: formatFieldsData(fields) });
    }
  };

  return (
    <form noValidate {...other} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export default Form;
