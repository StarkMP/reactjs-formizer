import React from 'react';

import { useFormizer } from '../hooks/useFormizer';
import { FormValues, UseFormizerParams } from '../types';

export const withFormizer = <A extends FormValues, T extends {}>(
  WrappedComponent: React.ComponentType<T & UseFormizerParams<A>>
): React.FC<T & Partial<UseFormizerParams<A>>> => {
  const ComponentWithFormizer: React.FC<T> = (props) => {
    const formizerProps = useFormizer<A>();

    return <WrappedComponent {...props} {...formizerProps} />;
  };

  return ComponentWithFormizer;
};
