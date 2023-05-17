import React, { useContext, useEffect, useState } from 'react';

import { FormContext } from '../../context';
import { FieldRules, FormValidationRules, RadioInputProps } from '../../types';
import { getValidationErrors } from '../../utils/validation';

const RadioInput: React.FC<RadioInputProps> = ({
  onChange,
  name,
  value,
  required,
  checked = false,
  custom,
  ...other
}) => {
  const [controlledValue, setControlledValue] = useState<boolean>(checked);
  const { updateValue, updateErrors, initialize, onFieldChange } =
    useContext(FormContext);

  const rules: FieldRules = {
    [FormValidationRules.Required]: required,
    [FormValidationRules.Custom]: custom,
  };

  useEffect(() => {
    initialize(name, {
      rules,
      reset: () => {
        setControlledValue(checked);
        updateValue(name, checked ? value : undefined);
        updateErrors(name, []);
      },
      set: (newValue) => {
        const checked = newValue === value;

        setControlledValue(checked);

        if (checked) {
          updateValue(name, value);

          const errors = getValidationErrors(checked, rules);

          updateErrors(name, errors);
        }
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

    const errors = getValidationErrors(value, rules);

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
