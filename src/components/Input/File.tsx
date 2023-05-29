import React, { useContext, useEffect } from 'react';

import { FormContext } from '../../context';
import { FieldRules, FileInputProps, FormValidationRules } from '../../types';
import { getValidationErrors } from '../../utils/validation';

const FileInput: React.FC<FileInputProps> = ({
  type,
  name,
  required,
  onChange,
  custom,
  ...other
}) => {
  const { updateValue, initialize, onFieldChange } = useContext(FormContext);

  const rules: FieldRules = {
    [FormValidationRules.Required]: required,
    [FormValidationRules.Custom]: custom,
  };

  useEffect(() => {
    initialize(name, {
      type,
      defaultValue: [],
      rules,
    });
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const filesList = Array.from(e.currentTarget.files || []);

    if (onChange) {
      onChange(e);
    }

    updateValue(name, filesList);

    const errors = getValidationErrors(filesList, rules);

    onFieldChange(name, { value: filesList, errors });
  };

  return <input {...other} type={type} name={name} onChange={handleChange} />;
};

export default FileInput;
