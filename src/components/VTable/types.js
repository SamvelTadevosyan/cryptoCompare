// @flow
import * as React from 'react';
import type { SortEndHandler } from 'react-sortable-hoc';

export type ColumnType = {
  label: string,
  hide?: boolean,
  width?: number,
  title?: string,
  dataKey: string,
  flexGrow?: number,
  className?: string,
  flexShrink?: number,
  headerStyle?: Object,
  alternativeDataKey: string,
  render?: (value: any, row: any) => React.Element<*>,
}

export type TableType = {
  handleSort: ?(sortOptions: Object, bol: boolean) => void,
  onRowClick: ?(data: any, rowIndex: number) => void,
  trackScroll?: ?(hasScrollBar: boolean) => void,
  handleDragSort?: ?SortEndHandler,
  scrollGetter?: (number) => void,
  defaultSortedDirection: number,
  renderAlternativeBody: any,
  scrollTopPosition: number,
  backgroundColor: string,
  rememberScroll: boolean,
  defaultSortedBy: string,
  scrollToIndex: ?number,
  disableHeader: boolean,
  selectedRowID: ?number,
  hasDragSort?: boolean,
  columns: ColumnType[],
  functional: boolean,
  multiLine: ?number,
  rowHeight: number,
  selectBy: ?string,
  data: Array<any>,
  border: string,
  height: number,
  width: number,
};
