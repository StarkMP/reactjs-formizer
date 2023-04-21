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
    [FormValidationRules.Pattern]: 'Email is incorrect!',
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
  age: {
    [FormValidationRules.Required]: 'Age is required!',
  },
  fav_language: {
    [FormValidationRules.Required]: 'Favorite language is required!',
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
        <Input
          name='email'
          type='email'
          placeholder='Email'
          required
          pattern='^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$'
        />
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

        <Input name='age' type='number' placeholder='Your age' required />
        {errors.age && validationMessages.age[errors.age[0]]}

        <div>
          <Input
            type='radio'
            id='html'
            name='fav_language'
            value='HTML'
            required
          />
          <label htmlFor='html'>HTML</label>
          <br />
          <Input
            type='radio'
            id='css'
            name='fav_language'
            value='CSS'
            required
          />
          <label htmlFor='css'>CSS</label>
          <br />
          <Input
            type='radio'
            id='javascript'
            name='fav_language'
            value='JavaScript'
            required
          />
          <label htmlFor='javascript'>JavaScript</label>
        </div>
        {errors.fav_language &&
          validationMessages.fav_language[errors.fav_language[0]]}

        <button type='submit'>Register</button>
      </Form>
    </div>
  );
};

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);
root.render(<RegistrationPage />);
