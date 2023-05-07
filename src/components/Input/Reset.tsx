import React, { useContext } from 'react';

import { FormContext } from '../../context';
import { ResetInputProps } from '../../types';

const ResetInput: React.FC<ResetInputProps> = (props) => {
  const { reset } = useContext(FormContext);

  return <input onClick={(): void => reset()} {...props} />;
};

export default ResetInput;
