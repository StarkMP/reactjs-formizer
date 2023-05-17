import React, { useContext, useEffect, useState } from 'react';

import { FormContext } from '../../context';
import { FieldRules, FormValidationRules, TextInputProps } from '../../types';
import { getValidationErrors } from '../../utils/validation';

const TextInput: React.FC<TextInputProps> = ({
  onChange,
  name,
  value,
  required,
  maxLength,
  minLength,
  pattern,
  custom,
  ...other
}) => {
  const [controlledValue, setControlledValue] = useState<string>(value || '');
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
        setControlledValue(value || '');
        updateValue(name, value || '');
        updateErrors(name, []);
      },
      set: (value) => {
        setControlledValue(value as string);
        updateValue(name, value);

        const errors = getValidationErrors(value, rules);

        updateErrors(name, errors);
      },
    });

    updateValue(name, controlledValue);
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.value;

    setControlledValue(value);

    if (onChange) {
      onChange(e);
    }

    updateValue(name, value);

    const errors = getValidationErrors(value, rules);

    updateErrors(name, errors);
    onFieldChange(name, { value, errors });
  };

  return (
    <input
      {...other}
      name={name}
      onChange={handleChange}
      value={controlledValue}
    />
  );
};

export default TextInput;
