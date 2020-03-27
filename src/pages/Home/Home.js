// @flow
import React, {
  useEffect,
} from 'react';

import { currenciesCCCAGG } from 'src/constants/currencies';
import { FlexBox } from 'src/styles/styled-components';

import { withRouter } from 'react-router';

import {
  getCurrencies,
} from 'src/selectors';

type HomeProps = {
  setUpdatedCurrencies: any,
  initialCurrencies: () => Promise<*>
};

const Home = ({ setUpdatedCurrencies, initialCurrencies }: HomeProps): React.Element<typeof FlexBox> => {
  let socket = null;

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
  };

  useEffect(() => {
    initialCurrencies().then(() => {
      socket = new WebSocket(`${SOCKET_BASE_URL}?api_key=${API_KEY}`);
      socket.onopen = socketOnOpen;
      socket.onmessage = socketOnMessage;
    });

    window.removeEventListener('unload', handleSocketConnectionClose);
    return (() => socket.close());
  }, []);

  return (
    <FlexBox vertical>
      Home
      {
        currencies.items && currencies.items.map(currency => (
          <FlexBox
            key={currency.id}
          >
            {currency.name} $ {currency.price}
          </FlexBox>
        ))
      }
    </FlexBox>
  );
};

export default withRouter(Home);
