// @flow
import * as React from 'react';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

import FunctionalTable from './components/functionalTable';

import type {
  TableType,
} from './types';

type VTableProps = TableType;

// $FlowFixMe
const VTable = React.forwardRef((props: VTableProps, ref) => (
  <AutoSizer>
    {({ width, height }) => (
      <FunctionalTable
        forwardedRef={ref}
        {...props}
        height={height}
        width={width}
      />
    )}
  </AutoSizer>
));

// $FlowFixMe
VTable.defaultProps = {
  data: [],
  border: '',
  rowHeight: 50,
  selectBy: null,
  multiLine: null,
  onRowClick: null,
  handleSort: null,
  scrollToIndex: null,
  selectedRowID: null,
  backgroundColor: '',
  disableHeader: false,
  rememberScroll: false,
  defaultSortedDirection: 1,
  hasDragSort: false,
  handleDragSort: null,
  trackScroll: null,
};

VTable.displayName = 'VTable';

export default VTable;
