// @flow

import * as React from 'react';
import { isEqual } from 'lodash-es';

export const memoWrapper = (component: React.Component<*>) => {
  const areEqual = (prevProps, nextProps) => isEqual(prevProps, nextProps);
  return React.memo(component, areEqual);
};

export const isFunction = (maybeFunction: any): boolean => typeof maybeFunction === 'function';

if (!document.body) throw new Error('Unexpectedly missing <body>.');
//  eslint-disable-next-line
export const body: HTMLElement = document.body;

export const func = () => {};

export const needToShowIndicator = (status: number): boolean => status === 1;
