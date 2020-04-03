// @flow
import * as React from 'react';
import styled from 'styled-components';
import isEqual from 'lodash-es/isEqual';

import {
  Icon,
  ToolTip,
} from 'src/components';
import {
  Text,
  FlexBox,
} from 'src/styles/styled-components';

import OptionsContainer from './OptionsContainer';

import {
  LabelStyled,
  DropdownStyled,
  ClearIconStyled,
} from './styled';

const disabled = ({ disabled }) => `
  ${disabled ? 'opacity: 0.4;' : ''}
`;

const ContainerStyled = styled(FlexBox)`
  position: relative;
  ${disabled}
`;

export type OptionProps = {
  data: any,
  id: number,
  title: 'string',
};

type DropdownProps = {
  label?: string,
  name?: string,
  disabled?: boolean,
  required?: boolean,
  placeholder?: string,
  clearable?: boolean,
  emptyDataText?: string,
  options: OptionProps[],
  value?: OptionProps | number,
  onChange: (data: any, name: string, e?: SyntheticEvent<EventTarget>) => void,
}

type DropdownState = {
  isOpen: boolean,
  isValid: boolean,
  selectedValue: ?OptionProps,
};

export default class Dropdown extends React.PureComponent<DropdownProps, DropdownState> {
  static defaultProps = {
    placeholder: 'Select value',
    emptyDataText: 'No data',
    clearable: false,
    required: false,
    disabled: false,
    value: '',
    label: '',
    name: '',
  };

  dropdownNode: RefType<DropdownStyled>;

  constructor(props: DropdownProps) {
    super(props);

    this.state = {
      isOpen: false,
      isValid: true,
      selectedValue: null,
    };

    this.dropdownNode = React.createRef<DropdownStyled>();
  }

  componentDidMount() {
    this.setDefaultValue(this.props, false, true);
  }

  componentDidUpdate(prevProps: DropdownProps) {
    const isChangeOptions = !isEqual(prevProps.options, this.props.options);

    if (isChangeOptions || prevProps.disabled !== this.props.disabled
      || prevProps.required !== this.props.required
      || prevProps.value !== this.props.value
    ) {
      this.setDefaultValue(this.props, isChangeOptions);
    }
  }

  setDefaultValue = (props: DropdownProps, isChangeOptions: boolean, isFirst?: boolean) => {
    const {
      value,
      options,
      required,
    } = props;

    let { selectedValue } = this.state;

    const hasOptions = options && options.length;

    if (hasOptions && required && typeof value !== 'number' && !selectedValue || (required && isChangeOptions)) {
      selectedValue = options && options.length && options[0];
    } else if (value && typeof value !== 'number') {
      selectedValue = value;
    } else if (value && hasOptions || value === 0 && options) {
      selectedValue = value;
    }

    this.setState(
      // $FlowFixMe
      { selectedValue },
      () => {
        // const val = (selectedValue && typeof selectedValue !== 'number') ? selectedValue.data : selectedValue;
        this.setValueFromProps(props, isFirst);

        // if (typeof this.props.onChange === 'function') {
        //   this.props.onChange(val, (this.props.name || ''));
        // }
      },
    );
  };

  getValue = () => {
    const { selectedValue } = this.state;
    return selectedValue ? (
      <ToolTip
        verticalFix={15}
        horizontalFix={15}
        position="bottom-left"
        title={selectedValue.title}
      >
        <Text
          size={18}
          lineHeight={24}
          line={1}
        >
          {selectedValue.title}
        </Text>
      </ToolTip>
    ) : (
      <ToolTip
        position="bottom-left"
        title={this.props.placeholder}
      >
        <Text
          line={1}
        >
          {this.props.placeholder}
        </Text>
      </ToolTip>
    );
  };

  setValueFromProps = (props: DropdownProps = this.props, isFirst?: boolean) => {
    const { required, disabled } = props;
    const validated = (required && !disabled) ? !!this.state.selectedValue : true;
    const isValid = isFirst || validated;

    this.setState({ isValid });
  };

  handleClick = () => {
    if (!this.props.disabled) {
      this.setState({ isOpen: true });
    }
  };

  optionClick = (data: any, e: SyntheticEvent<EventTarget>) => {
    this.setState(
      { selectedValue: data },
      () => {
        const {
          selectedValue,
        } = this.state;

        if (
          typeof this.props.onChange === 'function'
          && typeof selectedValue === 'object'
          && selectedValue
          && selectedValue.data
        ) {
          e.persist();
          this.setValueFromProps();
          this.props.onChange(selectedValue.data, (this.props.name || ''), e);
        }
      },
    );
  };

  closeDropdown = (isClose: boolean) => {
    this.setState({ isOpen: !isClose });
  };

  clearSelectedValue = () => {
    this.setState({ selectedValue: null }, () => {
      this.props.onChange(null, (this.props.name || ''));
      this.setValueFromProps();
    });
  };

  renderClearIcon = () => {
    const { selectedValue } = this.state;
    const { required, disabled, clearable } = this.props;

    if ((!required && !!selectedValue && !disabled && clearable) || (clearable && !!selectedValue)) {
      return (<ClearIconStyled onClick={this.clearSelectedValue} />);
    }

    return null;
  };

  render() {
    const { isOpen, selectedValue, isValid } = this.state;
    const {
      label,
      options,
      required,
      disabled,
      emptyDataText,
    } = this.props;

    return (
      <ContainerStyled
        vertical
        disabled={disabled}
      >
        {label && <LabelStyled>{label}</LabelStyled>}
        <DropdownStyled
          isOpen={isOpen}
          isValid={isValid}
          disabled={disabled}
          required={required}
          ref={this.dropdownNode}
          onClick={this.handleClick}
        >
          <Text>{this.getValue()}</Text>
          <FlexBox noGrow>
            <Icon name="down" />
          </FlexBox>
        </DropdownStyled>
        {this.renderClearIcon()}
        <OptionsContainer
          isOpen={isOpen}
          options={options}
          required={required}
          selectedValue={selectedValue}
          dropdownNode={this.dropdownNode}
          handleOnClose={this.closeDropdown}
          emptyDataText={(emptyDataText || '')}
          handleOnOptionClick={this.optionClick}
        />
      </ContainerStyled>
    );
  }
}
