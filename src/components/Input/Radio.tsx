import React, { useContext, useEffect } from 'react';

import { FormContext } from '../../context';
import { FormValidationRules, RadioInputProps } from '../../types';
import { getValidationErrors } from '../../utils/validation';

const RadioInput: React.FC<RadioInputProps> = ({
  onChange,
  name,
  value,
  required,
  defaultChecked,
  ...other
}) => {
  const { updateValue, updateErrors, initRules, onFieldChange, fields } =
    useContext(FormContext);

  useEffect(() => {
    if (required) {
      initRules(name, {
        [FormValidationRules.Required]: required,
        // [FormValidationRules.Custom]: custom,
      });
    }

    if (defaultChecked) {
      updateValue(name, value);
    }
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.value;

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
      value={value}
      defaultChecked={defaultChecked}
    />
  );
};

export default RadioInput;
