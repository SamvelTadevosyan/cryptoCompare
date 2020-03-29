// @flow
import React, {
  useState,
  useEffect,
} from 'react';

import { Wrapper } from 'src/components';
import { currenciesCCCAGG } from 'src/constants/currencies';
import { FlexBox } from 'src/styles/styled-components';

import { withRouter } from 'react-router';

import { memoWrapper } from 'src/utils';

import {
  getCurrencies,
} from 'src/selectors';

import {
  CoinTable,
} from './components';

type HomeProps = {
  setUpdatedCurrencies: any,
  initialCurrencies: () => Promise<*>,
};

const Home = ({ setUpdatedCurrencies, initialCurrencies }: HomeProps): React.Element<typeof FlexBox> => {
  let socket = null;

  // -------------- State -------------\\
  const [isLoading, setIsLoading] = useState(0);
  const [selectedCoinID, setSelectedCoinId] = useState(null);

  const currencies = getCurrencies();

  const handleSocketConnectionClose = () => {
    if (socket) {
      socket.close();
      socket = null;
    }
  };

  const socketOnMessage = (event: MessageEvent): void => {
    const message = JSON.parse(event.data || '{}');

    if (parseInt(message.TYPE, 10) === 5) {
      setUpdatedCurrencies(message);
    }
    handleSocketConnectionClose();
  };

  const socketOnOpen = () => {
    socket.send(JSON.stringify({
      action: 'SubAdd',
      subs: currenciesCCCAGG,
    }));
    setIsLoading(2);
  };

  useEffect(() => {
    setIsLoading(1);
    initialCurrencies().then(() => {
      socket = new WebSocket(`${SOCKET_BASE_URL}?api_key=${API_KEY}`);
      socket.onopen = socketOnOpen;
      socket.onmessage = socketOnMessage;
    });

    window.removeEventListener('unload', handleSocketConnectionClose);
    return (() => socket.close());
  }, []);

  const handleRowClick = (rowData: Object) => {
    setSelectedCoinId(rowData.id);
  };

  return (
    <Wrapper
      padding="20px"
      isBusy={isLoading}
    >
      <FlexBox
        style={{
          flexBasis: '30%',
          maxWidth: '30%',
        }}
      >
        <CoinTable
          coins={currencies.items}
          onRowClick={handleRowClick}
        />
      </FlexBox>
      <FlexBox
        justifyContent="center"
        alignItems="center"
        style={{
          flexBasis: '70%',
          maxWidth: '70%',
        }}
      >
        {selectedCoinID}
      </FlexBox>
    </Wrapper>
  );
};

export default withRouter(memoWrapper(Home));
