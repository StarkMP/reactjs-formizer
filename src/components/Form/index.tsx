import React, {
  FormHTMLAttributes,
  SyntheticEvent,
  useContext,
  useRef,
} from 'react';

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
  resetOnSubmit?: boolean;
};

const Form: React.FC<FormProps> = ({
  onSubmit,
  onValidationFailed,
  onFieldsChange,
  children,
  ...other
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const onReset = (): void => {
    if (!formRef.current) {
      return;
    }

    formRef.current.reset();
  };

  return (
    <FormProvider onFieldsChange={onFieldsChange} onReset={onReset}>
      <FormComponent
        {...other}
        onSubmit={onSubmit}
        formRef={formRef}
        onValidationFailed={onValidationFailed}
      >
        {children}
      </FormComponent>
    </FormProvider>
  );
};

const FormComponent: React.FC<
  Omit<FormProps, 'onFieldsChange'> & { formRef: any }
> = ({
  onSubmit,
  onValidationFailed,
  formRef,
  resetOnSubmit,
  children,
  ...other
}) => {
  const { updateErrors, reset, fields } = useContext(FormContext);

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

    if (resetOnSubmit) {
      reset();
    }
  };

  return (
    <form ref={formRef} noValidate {...other} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export default Form;
