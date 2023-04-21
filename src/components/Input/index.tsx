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
  type,
  value,
  required,
  maxLength,
  minLength,
  pattern,
  ...other
}) => {
  const [controlledValue, setControlledValue] = useState<FieldValue>(
    value || ''
  );
  const { updateValue, updateErrors, initRules, onFieldChange, fields } =
    useContext(FormContext);

  // const formattedValue = useMemo(() => {
  //   if (typeof controlledValue === 'number') {
  //     return String(controlledValue);
  //   }

  //   if (typeof controlledValue === 'boolean') {
  //     return controlledValue ? 'true' : 'false';
  //   }

  //   return controlledValue;
  // }, [controlledValue]);

  useEffect(() => {
    const rules: FieldRules = {
      [FormValidationRules.Required]: required,
      [FormValidationRules.MaxLength]: maxLength,
      [FormValidationRules.MinLength]: minLength,
      [FormValidationRules.Pattern]: pattern,
      // [FormValidationRules.Custom]: custom,
    };

    initRules(name, rules);

    if (type === 'radio') {
      updateValue(name, void 0);
    } else {
      updateValue(name, controlledValue);
    }
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
      type={type}
      name={name}
      onChange={handleChange}
      value={controlledValue}
    />
  );
};

export default Input;
