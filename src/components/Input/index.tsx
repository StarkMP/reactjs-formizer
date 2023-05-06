import React from 'react';

import {
  CheckboxInputProps,
  RadioInputProps,
  TextInputProps,
} from '../../types';
import CheckboxInput from './Checkbox';
import RadioInput from './Radio';
import TextInput from './Text';

export type InputProps = TextInputProps | RadioInputProps | CheckboxInputProps;

const Input: React.FC<InputProps> = ({ type = 'text', ...other }) => {
  switch (type) {
    case 'text':
    case 'password':
    case 'number':
    case 'email':
    case 'search':
    case 'tel':
    case 'url':
    case 'date':
    case 'datetime-local':
    case 'month':
    case 'week':
    case 'range':
    case 'color':
    case 'time':
      return <TextInput {...(other as TextInputProps)} type={type} />;

    case 'radio':
      return <RadioInput {...(other as RadioInputProps)} type={type} />;

    case 'checkbox':
      return <CheckboxInput {...(other as CheckboxInputProps)} type={type} />;

    // case 'file':
    //   return;

    // case 'hidden':
    //   return;

    // case 'reset':
    //   return <ResetInput {...(other as ResetInputProps)} type={type} />;

    default:
      return <input type={type} {...other} />;
  }
};

export default Input;
