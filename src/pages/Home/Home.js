// @flow
import React, {
  useState,
  useEffect,
} from 'react';
import { isEmpty } from 'lodash-es';

import { Wrapper } from 'src/components';
import { currenciesCCCAGG } from 'src/constants/currencies';

import { FlexBox } from 'src/styles/styled-components';

import { withRouter } from 'react-router';

import { memoWrapper } from 'src/utils';

import { getCurrencies } from 'src/selectors';

import {
  CoinTable,
  ConvertForm,
} from './components';

type HomeProps = {
  getPrice: () => void,
  setUpdatedCurrencies: () => void,
  initialCurrencies: () => Promise<*>,
};

const Home = ({ setUpdatedCurrencies, initialCurrencies, getPrice }: HomeProps): React.Element<typeof FlexBox> => {
  let socket = null;
  const currencies = getCurrencies();

  // -------------- State -------------\\
  const [isLoading, setIsLoading] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState(currencies.items[0]);

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
    // handleSocketConnectionClose();
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

  useEffect(() => {
    if (isEmpty(selectedCoin)) {
      setSelectedCoin(currencies.items[0]);
    }
  }, [currencies]);

  const handleRowClick = (rowData: Object) => {
    setSelectedCoin(rowData);
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
        {
          !isEmpty(selectedCoin) && (
            <ConvertForm
              getPrice={getPrice}
              selectedCoin={selectedCoin}
              selectCoin={setSelectedCoin}
            />
          )
        }
      </FlexBox>
    </Wrapper>
  );
};

export default withRouter(memoWrapper(Home));
