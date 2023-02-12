import React, { FC } from 'react';

export type InputComponentPropsFactory<T> = {
  value: T;
  onChange: (event: { value: T }) => void;
};

export type InputComponentProps = InputComponentPropsFactory<string>;

export type InputResultComponentProps = InputComponentPropsFactory<number>;

const getOnlyDigits = (value: string): string => value.replace(/\D/, '');

const getDisplayName = (WrappedComponent: React.ComponentType): string =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component';

export const withNumberInput = <P extends InputComponentProps>(
  InputComponent: React.ComponentType<P>
): FC<InputResultComponentProps> => {
  const WithNumberInput: FC<InputResultComponentProps> = ({ value, onChange, ...props }) => {
    const handleChange: InputComponentProps['onChange'] = (e) => {
      onChange({ ...e, value: getOnlyDigits(e.value) ? parseInt(getOnlyDigits(e.value), 10) : 0 });
    };
    return <InputComponent { ...(props as P) } onChange = { handleChange } value = { value?.toString() } />;
  };

  WithNumberInput.displayName = '123';//`WithNumberInput(${getDisplayName(InputComponent)})`;

  return WithNumberInput;

};

