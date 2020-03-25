import React from 'react';
import { render } from 'react-dom';
import Root from './Root';

try {
  document.addEventListener('DOMContentLoaded', () => {
    render(<Root />, document.getElementById('app'));
  });
} catch (err) {
  throw new Error(`Render error \n${err}`);
}
