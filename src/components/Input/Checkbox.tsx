import React, { useContext, useEffect } from 'react';

import { FormContext } from '../../context';
import {
  CheckboxInputProps,
  FieldRules,
  FormValidationRules,
} from '../../types';
import { getValidationErrors } from '../../utils/validation';

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  type,
  name,
  checked = false,
  required,
  onChange,
  custom,
  ...other
}) => {
  const { fields, updateValue, updateErrors, initialize, onFieldChange } =
    useContext(FormContext);

  const fieldValue = fields[name]?.value;

  const rules: FieldRules = {
    [FormValidationRules.Required]: required,
    [FormValidationRules.Custom]: custom,
  };

  useEffect(() => {
    initialize(name, {
      type,
      defaultValue: checked,
      rules,
    });
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.checked;

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
      checked={(fieldValue !== undefined ? fieldValue : checked) as boolean}
    />
  );
};

export default CheckboxInput;
