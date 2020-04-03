// @flow
import React from 'react';

import { isFunction, func } from 'src/utils';

import {
  Text,
  FlexBox,
} from 'src/styles/styled-components';

import base from 'src/styles/base';

import {
  LabelStyled,
  InputStyled,
  ContainerStyled,
} from './styled';

type InputProps = {
  name?: string,
  max?: ?number,
  type?: string,
  label?: string,
  value?: string,
  error?: boolean,
  secure?: boolean,
  errorText?: string,
  disabled?: boolean,
  autoFocus?: boolean,
  textIndent?: string,
  placeholder?: string,
  onKeyPress?: (e: SyntheticEvent<*>) => void,
  onBlur?: (value: string, name: string, e: SyntheticEvent<*>, error: boolean) => void,
  onChange?: (value: string, name: string, e: SyntheticEvent<*>, error: boolean) => void,
};

const Input = React.forwardRef((props: InputProps, ref) => {
  const {
    max,
    type,
    value,
    label,
    secure,
    onBlur,
    onChange,
    disabled,
    errorText,
    name = '',
    autoFocus,
    textIndent,
    onKeyPress,
    placeholder,
    error = false,
  } = props;

  const inputType = secure ? 'password' : type;

  const handleOnChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    e.persist();

    if ((max && value.length <= max) || !max) {
      if (onChange && isFunction(onChange) && !disabled) {
        onChange(value, name, e, error);
      }
    }
  };

  const handleBlur = (e: SyntheticEvent<HTMLInputElement>): void => {
    const {
      value,
    } = e.currentTarget;

    e.persist();

    if ((max && value.length <= max) || !max) {
      if (onBlur && isFunction(onBlur) && !disabled) {
        onBlur(value, name, e, error);
      }
    }
  };

  const handleOnKeyPress = (e: SyntheticEvent<>) => {
    e.persist();

    if (!!onKeyPress && isFunction(onKeyPress)) {
      onKeyPress(e);
    }
  };

  const renderLabel = (label: string) => !!label && (
    <LabelStyled>{label}</LabelStyled>
  );

  return (
    <ContainerStyled disabled={disabled} margin={!!label}>
      {renderLabel(label || '')}
      <InputStyled
        name={name}
        value={value}
        error={error}
        type={inputType}
        onBlur={handleBlur}
        disabled={disabled}
        autoFocus={autoFocus}
        textIndent={textIndent}
        placeholder={placeholder}
        onChange={handleOnChange}
        onKeyPress={handleOnKeyPress}
        ref={ref}
      />
      {
        error && (
          <FlexBox vertical minHeight="16px">
            <Text color={base.colors.alert}>
              {errorText}
            </Text>
          </FlexBox>
        )
      }
    </ContainerStyled>
  );
});

Input.defaultProps = {
  label: '',
  value: '',
  max: null,
  type: 'text',
  error: false,
  onBlur: func,
  secure: false,
  name: 'input',
  errorText: '',
  onChange: func,
  textIndent: '',
  placeholder: '',
  disabled: false,
  autoFocus: false,
  onKeyPress: func,
};
Input.displayName = 'Input';

export default Input;
