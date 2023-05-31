import React from 'react';

import { useFormizer } from '../hooks/useFormizer';
import { UseFormizerParams } from '../types';

export const withFormizer = <T extends {}>(
  WrappedComponent: React.ComponentType<T & UseFormizerParams>
): React.FC<T & Partial<UseFormizerParams>> => {
  const ComponentWithFormizer: React.FC<T> = (props) => {
    const formizerProps = useFormizer();

    return <WrappedComponent {...props} {...formizerProps} />;
  };

  return ComponentWithFormizer;
};
