import React, { useContext, useEffect } from 'react';

import { FormContext } from '../../context';
import { FieldRules, FormValidationRules, TextInputProps } from '../../types';
import { getValidationErrors } from '../../utils/validation';

const TextInput: React.FC<TextInputProps> = ({
  type,
  name,
  value = '',
  required,
  maxLength,
  minLength,
  pattern,
  onChange,
  custom,
  ...other
}) => {
  const { fields, updateValue, updateErrors, initialize, onFieldChange } =
    useContext(FormContext);

  const fieldValue = fields[name]?.value;

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
    });
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.value;

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
      type={type}
      name={name}
      onChange={handleChange}
      value={(fieldValue !== undefined ? fieldValue : value) as string}
    />
  );
};

export default TextInput;
