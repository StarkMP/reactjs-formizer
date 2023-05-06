import React, { useContext, useEffect, useState } from 'react';

import { FormContext } from '../../context';
import { FormValidationRules, RadioInputProps } from '../../types';
import { getValidationErrors } from '../../utils/validation';

const RadioInput: React.FC<RadioInputProps> = ({
  onChange,
  name,
  value,
  required,
  checked = false,
  ...other
}) => {
  const [controlledValue, setControlledValue] = useState<boolean>(checked);
  const { updateValue, updateErrors, initialize, onFieldChange, fields } =
    useContext(FormContext);

  useEffect(() => {
    initialize(name, {
      rules: {
        [FormValidationRules.Required]: required,
        // [FormValidationRules.Custom]: custom,
      },
      reset: () => {
        setControlledValue(checked);
        updateValue(name, checked);
        updateErrors(name, []);
      },
    });

    if (checked) {
      updateValue(name, value);
    }
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const checked = e.currentTarget.checked;

    setControlledValue(checked);

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
      checked={controlledValue}
    />
  );
};

export default RadioInput;
