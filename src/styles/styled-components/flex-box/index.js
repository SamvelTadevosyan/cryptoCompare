// @flow
import styled, { type ReactComponentStyled } from 'styled-components';

const defaultProps = {
  wrapContent: false,
  noGrow: false,
  center: false,
  yScroll: false,
  xScroll: false,
  noShrink: false,
  vertical: false,
  width: '',
  margin: '',
  fontSize: null,
  block: false,
};

const getStyles = (props: FlexBoxPropTypes) => {
  const {
    wrapContent,
    cursor,
    noGrow,
    flexGrow,
    width,
    center,
    yScroll,
    xScroll,
    noShrink,
    vertical,
    order,
    position,
    top,
    left,
    right,
    bottom,
    alignItems,
    justifyContent,
    margin,
    fontSize,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    padding,
    block,
    height,
    minHeight,
    minWidth,
    paddingTop,
    paddingLeft,
    paddingRight,
    paddingBottom,
    backgroundColor,
    borderBottom,
    borderRight,
    borderLeft,
    borderTop,
    border,
    borderRadius,
    color,
    font,
    fontFamily,
    fontStyle,
    fontWeight,
    transition,
    opacity,
    maxHeight,
    maxWidth,
    zIndex,
    overflow,
    flexBasis,
  } = props;

  return `
    ${position ? `position: ${position};` : ''}
    ${top ? `top: ${top};` : ''}
    ${left ? `left: ${left};` : ''}
    ${right ? `right: ${right};` : ''}
    ${bottom ? `bottom: ${bottom};` : ''}
    ${height ? `height: ${height};` : ''}
    ${cursor ? `cursor: ${cursor};` : ''}
    ${block ? `display: block;` : 'display: flex;'}
    ${minHeight ? `min-height: ${minHeight};` : ''}
    ${minWidth ? `min-width: ${minWidth};` : ''}
    ${width ? `width: ${width};` : ''}
    ${backgroundColor ? `background-color: ${backgroundColor};` : ''}
    ${fontSize ? `font-size: ${fontSize}px;` : ''}
    box-sizing: border-box;
    ${order ? `order: ${order};` : ''}
    flex-grow: ${noGrow ? 0 : 1};
    ${flexGrow ? `flex-grow: ${flexGrow};` : ''}
    flex-shrink: ${noShrink ? 0 : 1};
    flex-wrap: ${wrapContent ? 'wrap' : 'nowrap'};
    ${flexBasis ? `flex-basis: ${flexBasis};` : ''}
    flex-direction: ${vertical ? 'column' : 'row'};
    ${justifyContent ? `justify-content: ${justifyContent};` : ''}
    ${alignItems ? `align-items: ${alignItems};` : ''}
    ${center ? 'margin: auto;' : ''}
    ${yScroll ? 'overflow-y: auto;' : ''}
    ${xScroll ? 'overflow-x: auto;' : ''}
    ${overflow ? `overflow: ${overflow};` : ''}
    ${marginTop ? `margin-top: ${marginTop}px;` : ''}
    ${marginBottom ? `margin-bottom: ${marginBottom}px;` : ''}
    ${marginLeft ? `margin-left: ${marginLeft}px;` : ''}
    ${marginRight ? `margin-right: ${marginRight}px;` : ''}
    ${margin ? `margin: ${margin};` : ''}
    ${paddingTop ? `padding-top: ${paddingTop}px;` : ''}
    ${paddingBottom ? `padding-bottom: ${paddingBottom}px;` : ''}
    ${paddingLeft ? `padding-left: ${paddingLeft}px;` : ''}
    ${paddingRight ? `padding-right: ${paddingRight}px;` : ''}
    ${padding ? `padding: ${padding};` : ''}
    ${border ? `border: ${border}` : ''}
    ${borderBottom ? `border-bottom: ${borderBottom}` : ''}
    ${borderRight ? `border-right: ${borderRight}` : ''}
    ${borderLeft ? `border-left: ${borderLeft}` : ''}
    ${borderTop ? `border-top: ${borderTop}` : ''}
    ${borderRadius ? `border-radius: ${borderRadius}` : ''}
    ${color ? `color: ${color};` : ''}
    ${font ? `font: ${font}` : ''}
    ${fontStyle ? `font-style: ${fontStyle}` : ''}
    ${fontFamily ? `font-family: ${fontFamily}` : ''}
    ${fontWeight ? `font-weight: ${fontWeight}` : ''}
    ${transition ? `transition: ${transition}` : ''}
    ${opacity ? `opacity: ${opacity}` : ''}
    ${maxHeight ? `max-height: ${typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight}` : ''}
    ${maxWidth ? `max-width: ${maxWidth}` : ''}
    ${zIndex ? `z-index: ${zIndex}` : ''}
  `;
};

const FlexBox: ReactComponentStyled<FlexBoxPropTypes> = styled.div`
  ${getStyles}
`;

FlexBox.displayName = 'FlexBox';
FlexBox.defaultProps = defaultProps;

export default FlexBox;
