import React, { FC } from 'react';
import BtnComponent from '../BtnComponent';
import { InputComponentPropsFactory } from './withNumberInput';


export type InputArrowComponentPropsFactory<T> = {
    value: T;
    onChange: (event: { value: T }) => void;
    children?: React.ReactNode;
  };

export type InputComponentProps = InputArrowComponentPropsFactory<number>;

const getDisplayName = (WrappedComponent: React.ComponentType): string =>
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

export const withInputArrows = <P extends InputComponentProps>(
    InputComponent: React.ComponentType<P>
): FC<InputComponentProps> => {
    const WithInputArrows: FC<InputComponentProps> = (props) => {
        const { value, onChange,children } = props;
        return (
            <div>
                <BtnComponent onClick={(): void => onChange({ value: value - 1 })}>
                    -
                </BtnComponent>
                <InputComponent {...(props as P)} />
                <BtnComponent onClick={(): void => onChange({ value: value + 1 })}>
                    +
                </BtnComponent>
                {children}
            </div>
        );
    };

    WithInputArrows.displayName = '123'//`WithInputArrows(${getDisplayName(InputComponent)})`;

    return WithInputArrows;
};