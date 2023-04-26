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
  ...other
}) => {
  const [controlledValue, setControlledValue] = useState<string>(value || '');
  const { updateValue, updateErrors, initRules, onFieldChange, fields } =
    useContext(FormContext);

  useEffect(() => {
    const rules: FieldRules = {
      [FormValidationRules.Required]: required,
      [FormValidationRules.MaxLength]: maxLength,
      [FormValidationRules.MinLength]: minLength,
      [FormValidationRules.Pattern]: pattern,
      // [FormValidationRules.Custom]: custom,
    };

    initRules(name, rules);
    updateValue(name, controlledValue);
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.value;

    setControlledValue(value);

    if (onChange) {
      onChange(e);
    }

    updateValue(name, value);

    const errors = getValidationErrors(value, fields[name].rules);

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
