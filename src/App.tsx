import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

import {
  FieldsChangeHandler,
  Form,
  FormErrors,
  FormValidationRules,
  Input,
  SubmitHandler,
  ValidationFailedHandler,
} from '.';

const validationMessages: {
  [fieldName: string]: { [ruleName: string]: string };
} = {
  email: {
    [FormValidationRules.Required]: 'Email is required!',
  },
  password: {
    [FormValidationRules.Required]: 'Password is required!',
    [FormValidationRules.MinLength]:
      'Password must be greater than 6 characters!',
    [FormValidationRules.MaxLength]:
      'Password must be less or equal 18 characters!',
  },
  confirm: {
    [FormValidationRules.Required]: 'Please confirm password!',
  },
};

export const RegistrationPage: React.FC = () => {
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit: SubmitHandler = ({ data }): void => {
    console.log('onSubmit', data);
  };

  const handleValidationFailed: ValidationFailedHandler = ({ data }): void => {
    const { errors } = data;

    setErrors(errors);

    console.log('onValidationFailed', data);
  };

  const handleFieldsChange: FieldsChangeHandler = ({ values, errors }) => {
    setErrors(errors);

    console.log('onFieldsChange', { values, errors });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>Registration</h1>
      <Form
        onSubmit={handleSubmit}
        onValidationFailed={handleValidationFailed}
        onFieldsChange={handleFieldsChange}
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '300px',
        }}
      >
        <Input name='email' type='email' placeholder='Email' required />
        {errors.email && validationMessages.email[errors.email[0]]}
        <Input
          name='password'
          type='password'
          placeholder='Password'
          required
          maxLength={18}
          minLength={6}
        />
        {errors.password && validationMessages.password[errors.password[0]]}
        <Input
          name='confirm'
          type='password'
          placeholder='Confirm password'
          required
        />
        {errors.confirm && validationMessages.confirm[errors.confirm[0]]}
        <button type='submit'>Register</button>
      </Form>
    </div>
  );
};

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);
root.render(<RegistrationPage />);
