import React, { useContext, useEffect } from 'react';

import { FormContext } from '../../context';
import { FieldRules, FormValidationRules, HiddenInputProps } from '../../types';
import { getValidationErrors } from '../../utils/validation';

const HiddenInput: React.FC<HiddenInputProps> = ({
  type,
  name,
  value = '',
  required,
  maxLength,
  minLength,
  pattern,
  onReset,
  custom,
  ...other
}) => {
  const { fields, updateValue, updateErrors, initialize, onFieldChange } =
    useContext(FormContext);

  const rules: FieldRules = {
    [FormValidationRules.Required]: required,
    [FormValidationRules.MaxLength]: maxLength,
    [FormValidationRules.MinLength]: minLength,
    [FormValidationRules.Pattern]: pattern,
    [FormValidationRules.Custom]: custom,
  };

  useEffect(() => {
    initialize(name, {
      type,
      defaultValue: value,
      rules,
      onReset: () => {
        if (onReset === undefined) {
          return;
        }

        onReset();
        updateValue(name, value);
        updateErrors(name, []);
      },
    });
  }, []);

  useEffect(() => {
    if (fields[name]) {
      updateValue(name, value);

      const errors = getValidationErrors(value, rules);

      updateErrors(name, errors);
      onFieldChange(name, { value, errors });
    }
  }, [value]);

  return <input {...other} type={type} name={name} value={value} />;
};

export default HiddenInput;
