// @flow
import React, {
  useMemo,
} from 'react';
import styled, { keyframes } from 'styled-components';

import { Text, FlexBox } from 'src/styles/styled-components';
import { VTable } from 'src/components';
import base from 'src/styles/base';

type CoinsTableProps = {
  coins: Object[],
  onRowClick: () => void;
};

const backgroundColor = ({ backgroundC }) => keyframes`
  from {
    background: ${backgroundC};
    color: white;
  }

  to {
    background: ${backgroundC};
    color: white;
  }
`;

const PriceStyled = styled(FlexBox)`
  padding: 10px 15px;
  border-radius: 3px;
  background: ${base.colors.lightGrey};
  animation: ${backgroundColor} 1.5s;
`;

const CoinTable = ({ coins, onRowClick }: CoinsTableProps): React.Element<typeof VTable> => {
  const renderPriceCell = (value, rowData) => {
    const backgroundColor = value > rowData.prevPrice
      ? base.colors.darkGreen : value < rowData.prevPrice
        ? base.colors.alertDark : null;

    return (
      <PriceStyled
        noGrow
        key={value}
        backgroundC={backgroundColor}
      >
        <Text
          bold
          noColor
        >
          $ {value}
        </Text>
      </PriceStyled>
    );
  };

  const renderCoinCell = value => (
    <Text
      bold
    >
      {value}
    </Text>
  );

  const columns = useMemo(
    () => ([
      {
        flexGrow: 1,
        flexShrink: 2,
        sortable: false,
        label: 'Coin',
        dataKey: 'name',
        render: renderCoinCell,
      },
      {
        flexGrow: 2,
        sortable: false,
        label: 'Price',
        dataKey: 'price',
        render: renderPriceCell,
      },
    ]),
    [coins],
  );

  return (
    <VTable
      data={coins}
      multiLine={2}
      rememberScroll
      columns={columns}
      onRowClick={onRowClick}
      headerBackgroundColor={base.colors.cyan}
      border={`2px solid ${base.colors.cyan}`}
    />
  );
};

export default CoinTable;
