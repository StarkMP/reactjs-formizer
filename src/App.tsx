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
    [FormValidationRules.Required]: 'The email is required!',
    [FormValidationRules.Pattern]: 'The email is incorrect!',
  },
  password: {
    [FormValidationRules.Required]: 'The password is required!',
    [FormValidationRules.MinLength]:
      'The password must be greater than 6 characters!',
    [FormValidationRules.MaxLength]:
      'The password must be less or equal 18 characters!',
  },
  confirm: {
    [FormValidationRules.Required]: 'Please confirm the password!',
  },
  age: {
    [FormValidationRules.Required]: 'The age is required!',
  },
  fav_language: {
    [FormValidationRules.Required]: 'The favorite language is required!',
  },
  privacy: {
    [FormValidationRules.Required]: 'You must accept the privacy policy!',
  },
  country: {
    [FormValidationRules.Required]: 'Please, fill your country!',
  },
  phone: {
    [FormValidationRules.Required]: 'Please, fill your phone!',
  },
  linkedin: {
    [FormValidationRules.Required]: 'Please, fill your LinkedIn profile!',
  },
  birthday: {
    [FormValidationRules.Required]: 'Please, fill your birthday!',
  },
  favorite_color: {
    [FormValidationRules.Required]: 'Please, pick your favorite color!',
  },
  some_range: {
    [FormValidationRules.Required]: 'Please, set up some range!',
  },
};

const getError = (name: string, errors: FormErrors): string | null => {
  return errors[name] ? validationMessages[name][errors[name][0]] : null;
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
        resetOnSubmit
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
        {getError('email', errors)}

        <Input
          name='password'
          type='password'
          placeholder='Password'
          required
          maxLength={18}
          minLength={6}
        />
        {getError('password', errors)}

        <Input
          name='confirm'
          type='password'
          placeholder='Confirm password'
          required
        />
        {getError('confirm', errors)}

        <Input name='age' type='number' placeholder='Your age' required />
        {getError('age', errors)}

        <label htmlFor='fav_language'>Choose favorite language</label>
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
          <Input type='radio' id='css' name='fav_language' value='CSS' />
          <label htmlFor='css'>CSS</label>
          <br />
          <Input
            type='radio'
            id='javascript'
            name='fav_language'
            value='JavaScript'
          />
          <label htmlFor='javascript'>JavaScript</label>
        </div>
        {getError('fav_language', errors)}

        <div style={{ display: 'flex' }}>
          <label htmlFor='news'>I want to receive news</label>
          <Input type='checkbox' name='news' checked />
        </div>

        <div style={{ display: 'flex' }}>
          <label htmlFor='privacy'>Accept the privacy policy</label>
          <Input type='checkbox' name='privacy' required />
        </div>
        {getError('privacy', errors)}

        <Input name='country' type='search' placeholder='Country' required />
        {getError('country', errors)}

        <Input name='phone' type='tel' placeholder='Phone number' required />
        {getError('phone', errors)}

        <Input
          name='linkedin'
          type='url'
          placeholder='LinkedIn profile url'
          required
        />
        {getError('linkedin', errors)}

        <label htmlFor='birthday'>Your birthday</label>
        <Input name='birthday' type='date' required />
        {getError('birthday', errors)}

        <label htmlFor='favorite_color'>Pick your favorite color</label>
        <Input name='favorite_color' type='color' required />
        {getError('favorite_color', errors)}

        <label htmlFor='some_range'>Set up some range</label>
        <Input name='some_range' type='range' min={0} max={5} required />
        {getError('some_range', errors)}

        <div style={{ display: 'flex', marginTop: '20px' }}>
          <button type='submit'>Register</button>
          <Input type='reset' value='Reset' />
        </div>
      </Form>
    </div>
  );
};

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);
root.render(<RegistrationPage />);
