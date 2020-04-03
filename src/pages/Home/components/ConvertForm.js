// @flow

import React, {
  useState,
  useEffect,
} from 'react';

import {
  Input,
  Dropdown,
} from 'src/components';

import { FlexBox } from 'src/styles/styled-components';

import {
  firstDropDown,
  secondDropDown,
} from 'src/constants/currencies';

type ConvertFormProps = {
  selectedCoin: Object,
  getPrice: () => void,
};

const ConvertForm = ({
  getPrice,
  selectedCoin,
}: ConvertFormProps): React.Element<typeof FlexBox> => {
  const [price, setPrice] = useState(0);
  const [inputsValue, setInputsValue] = useState({
    first: 1,
    second: selectedCoin.price || 1,
  });

  const [dropDownsValue, selectDropDown] = useState({
    first: firstDropDown.find(cc => cc.data.value === selectedCoin.name) || firstDropDown[0],
    second: secondDropDown[0],
  });

  const handleInputChange = (value, name) => {
    if (isNaN(value)) {
      return false;
    }
    let other = 0;
    let otherName = '';
    const parsedValue = parseFloat(value, 10);
    if (name === 'first') {
      otherName = 'second';
      other = parsedValue * price || selectedCoin.price;
    } else if (name === 'second') {
      otherName = 'first';
      other = parsedValue / price || selectedCoin.price;
    }

    return setInputsValue({
      [otherName]: value === '' ? '' : other,
      [name]: value === '' ? '' : value,
    });
  };

  const setPrices = (first, second) => {
    getPrice(first, second).then(res => {
      setInputsValue({
        first: inputsValue.first,
        second: inputsValue.first * res[first][second],
      });
      setPrice(res[first][second]);
    });
  };

  const handleDropDownChange = (data, name) => {
    let first = {};
    let second = '';
    let selectedOption = {};
    if (name === 'first') {
      selectedOption = firstDropDown.find(cc => cc.data.value === data.value);
      first = selectedOption.data.value;
      second = dropDownsValue.second.data.value;
    } else if (name === 'second') {
      selectedOption = secondDropDown.find(cc => cc.data.value === data.value);
      first = dropDownsValue.first.data.value;
      second = selectedOption.data.value;
    }
    selectDropDown(prevState => ({
      ...prevState,
      [name]: selectedOption,
    }));

    setPrices(first, second);
  };

  useEffect(() => {
    const selected = firstDropDown.find(cc => cc.data.value === selectedCoin.name);

    selectDropDown(prevState => ({
      ...prevState,
      first: selected,
    }));

    const {
      second,
    } = dropDownsValue;

    setPrices(selectedCoin.name, second.data.value);
  }, [selectedCoin]);

  const inputs = [
    {
      key: 1,
      name: 'first',
      value: inputsValue.first,
    },
    {
      key: 2,
      name: 'second',
      value: inputsValue.second,
    },
  ];

  const dropDowns = [
    {
      key: 1,
      name: 'first',
      options: firstDropDown,
      value: dropDownsValue.first,
    },
    {
      key: 2,
      options: secondDropDown,
      name: 'second',
      value: dropDownsValue.second,
    },
  ];

  return (
    <FlexBox
      noGrow
    >
      <FlexBox
        vertical
        style={{
          flexBasis: '50%',
          maxWidth: '50%',
        }}
      >
        {
          inputs.map(input => (
            <FlexBox
              noGrow
              padding="10px"
              key={input.key}
            >
              <Input
                {...input}
                onChange={handleInputChange}
              />
            </FlexBox>
          ))
        }
      </FlexBox>
      <FlexBox
        vertical
        style={{
          flexBasis: '50%',
          maxWidth: '50%',
        }}
      >
        {
          dropDowns.map(dropDown => (
            <FlexBox
              noGrow
              padding="10px"
              key={dropDown.key}
            >
              <Dropdown
                {...dropDown}
                onChange={handleDropDownChange}
              />
            </FlexBox>
          ))
        }
      </FlexBox>
    </FlexBox>
  );
};

export default ConvertForm;
