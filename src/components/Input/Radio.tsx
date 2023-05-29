import React, { useContext, useEffect } from 'react';

import { FormContext } from '../../context';
import { FieldRules, FormValidationRules, RadioInputProps } from '../../types';
import { getValidationErrors } from '../../utils/validation';

const RadioInput: React.FC<RadioInputProps> = ({
  type,
  name,
  value,
  required,
  checked = false,
  onChange,
  custom,
  ...other
}) => {
  const { fields, updateValue, updateErrors, initialize, onFieldChange } =
    useContext(FormContext);

  const rules: FieldRules = {
    [FormValidationRules.Required]: required,
    [FormValidationRules.Custom]: custom,
  };

  useEffect(() => {
    initialize(name, {
      type,
      defaultValue: checked ? value : null,
      rules,
    });
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const checked = e.currentTarget.checked;

    if (onChange) {
      onChange(e);
    }

    if (checked) {
      updateValue(name, value);

      const errors = getValidationErrors(value, rules);

      updateErrors(name, errors);
      onFieldChange(name, { value, errors });
    }
  };

  return (
    <input
      {...other}
      type={type}
      name={name}
      onChange={handleChange}
      value={value}
      checked={fields[name]?.value === value}
    />
  );
};

export default RadioInput;
