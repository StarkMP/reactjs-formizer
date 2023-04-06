import React, {
  InputHTMLAttributes,
  useContext,
  useEffect,
  useState,
} from 'react';

import { FormContext } from '../../context';
import { FieldRules, FieldValue, FormValidationRules } from '../../types';
import { getValidationErrors } from '../../utils/validation';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> & {
  name: string;
};

const Input: React.FC<InputProps> = ({
  onChange,
  name,
  required,
  maxLength,
  minLength,
  pattern,
  ...other
}) => {
  const [value, setValue] = useState<FieldValue>('');
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
    updateValue(name, value);
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.value;

    setValue(value);

    if (onChange) {
      onChange(e);
    }

    updateValue(name, value);

    const errors = getValidationErrors(value, fields[name].rules);

    updateErrors(name, errors);
    onFieldChange(name, { value, errors });
  };

  return <input {...other} name={name} onChange={handleChange} value={value} />;
};

export default Input;
