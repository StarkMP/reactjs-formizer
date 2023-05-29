import React, { useContext, useEffect } from 'react';

import { FormContext } from '../../context';
import {
  FieldRules,
  FormValidationRules,
  NumericInputProps,
} from '../../types';
import { getValidationErrors } from '../../utils/validation';

const NumericInput: React.FC<NumericInputProps> = ({
  type,
  name,
  value = null,
  required,
  pattern,
  onChange,
  custom,
  ...other
}) => {
  const { fields, updateValue, updateFieldErrors, initialize, onFieldChange } =
    useContext(FormContext);

  const fieldValue = fields[name]?.value;

  const rules: FieldRules = {
    [FormValidationRules.Required]: required,
    [FormValidationRules.Pattern]: pattern,
    [FormValidationRules.Custom]: custom,
  };

  useEffect(() => {
    initialize(name, {
      type,
      defaultValue: value,
      rules,
    });
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = parseFloat(e.currentTarget.value);

    if (onChange) {
      onChange(e);
    }

    updateValue(name, value);

    const errors = getValidationErrors(value, rules);

    onFieldChange(name, { value, errors });
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    updateFieldErrors(name);
  };

  return (
    <input
      {...other}
      type={type}
      name={name}
      value={String(fieldValue !== undefined ? fieldValue : '')}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export default NumericInput;
