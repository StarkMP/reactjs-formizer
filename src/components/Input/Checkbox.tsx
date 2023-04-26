import React, { useContext, useEffect, useState } from 'react';

import { FormContext } from '../../context';
import { CheckboxInputProps, FormValidationRules } from '../../types';
import { getValidationErrors } from '../../utils/validation';

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  onChange,
  name,
  checked = false,
  required,
  ...other
}) => {
  const [controlledValue, setControlledValue] = useState<boolean>(checked);
  const { updateValue, updateErrors, initRules, onFieldChange, fields } =
    useContext(FormContext);

  useEffect(() => {
    initRules(name, {
      [FormValidationRules.Required]: required,
      // [FormValidationRules.Custom]: custom,
    });
    updateValue(name, checked);
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.checked;

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
      checked={controlledValue}
    />
  );
};

export default CheckboxInput;
