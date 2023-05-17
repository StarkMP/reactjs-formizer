import React, { useContext, useEffect, useState } from 'react';

import { FormContext } from '../../context';
import {
  CheckboxInputProps,
  FieldRules,
  FormValidationRules,
} from '../../types';
import { getValidationErrors } from '../../utils/validation';

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  onChange,
  name,
  checked = false,
  required,
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
        updateValue(name, checked);
        updateErrors(name, []);
      },
      set: (checked) => {
        setControlledValue(checked as boolean);
        updateValue(name, checked);

        const errors = getValidationErrors(checked, rules);

        updateErrors(name, errors);
      },
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

    const errors = getValidationErrors(value, rules);

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
