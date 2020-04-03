// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { body } from 'src/utils';

import Option from './Option';

import {
  DropdownStyled,
  OptionsContentStyled,
  OptionsContainerStyled,
} from './styled';

const EmptyDataText = styled.div`
  margin: 13px 0;
  text-align: center;
`;

type OptionProps = {
  data: any,
  id: number,
  title: 'string',
};

type OptionClickType = (optionData: OptionProps, e: SyntheticEvent<EventTarget>) => void;

type RenderOptionsType = (options: OptionProps[]) => React.Element<typeof OptionsContentStyled>;

type GenerateOptionsType = (options: OptionProps[]) =>
  React.Element<typeof EmptyDataText> | React.Element<typeof Option>[];

type OptionsContainerProps = {
  isOpen: boolean,
  emptyDataText: string,
  options: OptionProps[],
  selectedValue: ?OptionProps,
  handleOnOptionClick: OptionClickType,
  dropdownNode: RefType<DropdownStyled>,
  handleOnClose: (isClose: boolean) => void,
};

const OptionsContainer = ({
  isOpen,
  options,
  dropdownNode,
  handleOnClose,
  emptyDataText,
  selectedValue,
  handleOnOptionClick,
}): React.Portal | boolean => {
  const [container, setContainer] = React.useState(null);

  const handleClick: () => void = React.useCallback<() => void>(
    () => {
      handleOnClose(true);
    },
  [],
  );

  React.useEffect(
    () => {
      if (isOpen) {
        if (!container) {
          const newContainer = document.createElement('div');
          setContainer(newContainer);
          newContainer.setAttribute('id', 'options-container');

          body.appendChild(newContainer);
          document.addEventListener('click', handleClick);
        }
      } else if (container) {
        document.removeEventListener('click', handleClick);
        body.removeChild(container);
        setContainer(null);
      }
    },
    [isOpen],
  );

  const getDropDownPosition: () => Object = React.useCallback<() => Object>(
    () => {
      if (dropdownNode.current) {
        const {
          top,
          left,
          width,
          height,
        } = dropdownNode.current.getBoundingClientRect();

        return {
          left,
          top,
          width,
          height,
        };
      }

      return {};
    },
  [dropdownNode],
  );

  const handleOptionClick: OptionClickType = React.useCallback<OptionClickType>(
    (optionData: OptionProps, e: SyntheticEvent<EventTarget>) => {
      handleOnOptionClick(optionData, e);
    },
    [],
  );

  const generateOptions: GenerateOptionsType = React.useCallback<GenerateOptionsType>(
    (options: OptionProps[]): React.Element<typeof EmptyDataText> | React.Element<typeof Option>[] => {
      if (!options || (options && !options.length)) {
        return (
          <EmptyDataText>{emptyDataText}</EmptyDataText>
        );
      }

      return options.length ? options.map<React.Element<typeof Option>>((option: OptionProps) => {
        const selected = selectedValue && selectedValue.id === option.id;

        return (
          <Option
            data={option}
            key={option.id}
            selected={selected}
            label={option.title}
            onClick={handleOptionClick}
          />
        );
      }) : [];
    },
    [emptyDataText, selectedValue],
  );

  const renderOptions: RenderOptionsType = React.useCallback<RenderOptionsType>(
    (options: OptionProps[]): React.Element<typeof OptionsContentStyled> => {
      const parentSize = getDropDownPosition();

      const hasData = options || (options && options.length);

      return (
        <OptionsContentStyled
          hasData={hasData}
          size={parentSize}
        >
          <OptionsContainerStyled>
            {generateOptions(options)}
          </OptionsContainerStyled>
        </OptionsContentStyled>
      );
    },
    [],
  );

  return (isOpen && !!container) && ReactDOM.createPortal(
    renderOptions(options),
    container,
  );
};

export default React.memo<OptionsContainerProps>(OptionsContainer);
