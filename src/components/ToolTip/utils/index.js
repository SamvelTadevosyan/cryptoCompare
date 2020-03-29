export const CalculatePosition = (element, position, verticalFix, horizontalFix) => {
  if (!element) {
    return null;
  }
  
  const {
    top,
    left,
    right,
    width,
    height,
    bottom,
  } = element;

  let horizontal = 0;
  let vertical = 0;
  let fromX = 'top';
  let fromY = 'left';

  if (position === 'top-left') {
    horizontal = left;
    vertical = window.innerHeight - top;
    fromX = 'left';
    fromY = 'bottom';
  } else if (position === 'top') {
    horizontal = left + (width / 2);
    vertical = window.innerHeight - top;
    fromX = 'left';
    fromY = 'bottom';
  } else if (position === 'top-right') {
    horizontal = right;
    vertical = window.innerHeight - top;
    fromX = 'left';
    fromY = 'bottom';
  } else if (position === 'right-top') {
    horizontal = right;
    vertical = top;
    fromX = 'left';
    fromY = 'top';
  } else if (position === 'right') {
    horizontal = right;
    vertical = top + (height / 2);
    fromX = 'left';
    fromY = 'top';
  } else if (position === 'right-bottom') {
    horizontal = right;
    vertical = bottom;
    fromX = 'left';
    fromY = 'top';
  } else if (position === 'bottom-left') {
    horizontal = left;
    vertical = bottom;
    fromX = 'left';
    fromY = 'top';
  } else if (position === 'bottom') {
    horizontal = left + (width / 2);
    vertical = bottom;
    fromX = 'left';
    fromY = 'top';
  } else if (position === 'bottom-right') {
    horizontal = right;
    vertical = bottom;
    fromX = 'left';
    fromY = 'top';
  } else if (position === 'left-top') {
    horizontal = window.innerWidth - left;
    vertical = top;
    fromX = 'right';
    fromY = 'top';
  } else if (position === 'left') {
    horizontal = window.innerWidth - left;
    vertical = top - (height / 2);
    fromX = 'right';
    fromY = 'top';
  } else if (position === 'left-bottom') {
    horizontal = window.innerWidth - left;
    vertical = bottom;
    fromX = 'right';
    fromY = 'top';
  }

  return {
    fromX,
    fromY,
    vertical: vertical + verticalFix,
    horizontal: horizontal + horizontalFix,
  };
};
