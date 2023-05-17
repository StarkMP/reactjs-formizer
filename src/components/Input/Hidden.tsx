import React, { useContext, useEffect } from 'react';

import { FormContext } from '../../context';
import { FieldRules, FormValidationRules, HiddenInputProps } from '../../types';
import { getValidationErrors } from '../../utils/validation';

const HiddenInput: React.FC<HiddenInputProps> = ({
  onReset,
  name,
  value = '',
  required,
  maxLength,
  minLength,
  pattern,
  custom,
  ...other
}) => {
  const { updateValue, updateErrors, initialize, onFieldChange, fields } =
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
      rules,
      reset: () => {
        if (onReset === undefined) {
          return;
        }

        onReset();
        updateValue(name, value);
        updateErrors(name, []);
      },
      set: () => {},
    });

    updateValue(name, value);
  }, []);

  useEffect(() => {
    if (fields[name]) {
      updateValue(name, value);

      const errors = getValidationErrors(value, rules);

      updateErrors(name, errors);
      onFieldChange(name, { value, errors });
    }
  }, [value]);

  return <input {...other} name={name} value={value} />;
};

export default HiddenInput;
