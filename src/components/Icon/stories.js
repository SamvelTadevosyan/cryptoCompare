import React from 'react';
import { storiesOf } from '@storybook/react';
import Icon from 'src/components/Icon';

storiesOf('Icon', module)
  .add('default Icon', () => (
    <div>
      <Icon />
      <Icon color="red" size={25} />
      <Icon color="black" size={50} />
    </div>
  ))
  .add('right Icon', () => (
    <div>
      <Icon name="right" />
      <Icon name="right" color="red" size={25} />
      <Icon name="right" color="black" size={50} />
    </div>
  ))
  .add('left Icon', () => (
    <div>
      <Icon name="left" />
      <Icon name="left" color="red" size={25} />
      <Icon name="left" color="black" size={50} />
    </div>
  ))
  .add('down Icon', () => (
    <div>
      <Icon name="down" />
      <Icon name="down" color="red" size={25} />
      <Icon name="down" color="black" size={50} />
    </div>
  ))
  .add('up Icon', () => (
    <div>
      <Icon name="up" />
      <Icon name="up" color="red" size={25} />
      <Icon name="up" color="black" size={50} />
    </div>
  ))
  .add('arrow-right Icon', () => (
    <div>
      <Icon name="arrowRight" />
      <Icon name="arrowRight" color="red" size={25} />
      <Icon name="arrowRight" color="black" size={50} />
    </div>
  ))
  .add('arrow-down Icon', () => (
    <div>
      <Icon name="arrowDown" />
      <Icon name="arrowDown" color="red" size={25} />
      <Icon name="arrowDown" color="black" size={50} />
    </div>
  ))
  .add('arrow-up Icon', () => (
    <div>
      <Icon name="arrowUp" />
      <Icon name="arrowUp" color="red" size={25} />
      <Icon name="arrowUp" color="black" size={50} />
    </div>
  ))
  .add('x-mark Icon', () => (
    <div>
      <Icon name="xMark" />
      <Icon name="xMark" color="red" size={25} />
      <Icon name="xMark" color="black" size={50} />
    </div>
  ))
  .add('bell Icon', () => (
    <div>
      <Icon name="bell" />
      <Icon name="bell" color="red" size={25} />
      <Icon name="bell" color="black" size={50} />
    </div>
  ))
  .add('sort Icon', () => (
    <div>
      <Icon name="sort" />
      <Icon name="sort" color="red" size={25} />
      <Icon name="sort" color="black" size={50} />
    </div>
  ))
  .add('sortUp Icon', () => (
    <div>
      <Icon name="sortUp" />
      <Icon name="sortUp" color="red" size={25} />
      <Icon name="sortUp" color="black" size={50} />
    </div>
  ))
  .add('sortDown Icon', () => (
    <div>
      <Icon name="sortDown" />
      <Icon name="sortDown" color="red" size={25} />
      <Icon name="sortDown" color="black" size={50} />
    </div>
  ))
  .add('search Icon', () => (
    <div>
      <Icon name="search" />
      <Icon name="search" color="red" size={25} />
      <Icon name="search" color="black" size={50} />
    </div>
  ))
  .add('edit Icon', () => (
    <div>
      <Icon name="edit" />
      <Icon name="edit" color="red" size={25} />
      <Icon name="edit" color="black" size={50} />
    </div>
  ))
  .add('trash Icon', () => (
    <div>
      <Icon name="trash" />
      <Icon name="trash" color="red" size={25} />
      <Icon name="trash" color="black" size={50} />
    </div>
  ))
  .add('backArrow Icon', () => (
    <div>
      <Icon name="backArrow" />
      <Icon name="backArrow" color="red" size={25} />
      <Icon name="backArrow" color="black" size={50} />
    </div>
  ));
