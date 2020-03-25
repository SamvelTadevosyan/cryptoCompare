export const getValueString = value =>
  typeof value === 'number' ? `${value}px` : value;

export const getColor = colorName => ({ theme }) => `${theme.colors[colorName]}`;
export const getFontWeight = size => ({ theme }) => `${theme.fontWeight[size]}`;
export const getFontSize = size => ({ theme }) => `${getValueString(theme.fontSize[size])}`;
