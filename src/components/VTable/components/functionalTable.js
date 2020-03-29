// @flow

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import cloneDeep from 'lodash-es/cloneDeep';

import {
  defaultTableRowRenderer,
  Column,
  Table,
} from 'react-virtualized';

import {
  SortableContainer,
  SortableElement,
} from 'react-sortable-hoc';

import {
  FlexBox,
  Text,
} from 'src/styles/styled-components';

import {
  ToolTip,
  Icon,
  Item,
} from 'src/components';

import { isFunction, memoWrapper } from 'src/utils';

import { Wrap } from '../styled';

import type { TableType } from '../types';

type functionalTableProps = TableType;

const {
  useRef,
  useState,
  useEffect,
  useCallback,
} = React;

const SortableTable = SortableContainer(Table, { withRef: true });
const SortableTableRowRenderer = SortableElement(defaultTableRowRenderer);

const FunctionalTable = (props: functionalTableProps) => {
  const {
    defaultSortedDirection,
    renderAlternativeBody,
    headerBackgroundColor,
    defaultSortedBy,
    backgroundColor,
    rememberScroll,
    handleDragSort,
    disableHeader,
    selectedRowID,
    scrollToIndex,
    scrollGetter,
    hasDragSort,
    trackScroll,
    handleSort,
    onRowClick,
    rowHeight,
    multiLine,
    selectBy,
    columns,
    border,
    height,
    width,
    data,
  } = props;

  // -------------- State ---------------
  const [scrollTop, setScrollTop] = useState<number | undefined>(undefined);
  const [oldLength, setOldLength] = useState<number>(0);
  const [rows, setRows] = useState<Object[]>([]);
  const [sort, setSort] = useState<Object>({
    column: defaultSortedBy,
    type: defaultSortedDirection,
  });

  const updatedValues = useRef(null);
  const table = useRef<React.ElementRef<typeof SortableTable> | null>(null);
  const firstUpdate = useRef<boolean>(true);

  // ----------------- getDerivedStateFromProps --------------------
  useEffect(
    () => {
      setOldLength(props.data.length);
      setRows(cloneDeep(props.data));

      if (firstUpdate.current) {
        firstUpdate.current = false;
      }
    },
    [props]
  );

  useEffect(
    () => {
      updatedValues.current = {
        scrollTop,
      };
    },
    [scrollTop]
  );

  useEffect(
    () => {
      if (table && table.current && trackScroll) {
        let hasScrollBar = 0;
        const rowCount = rows.length;

        if (rowCount > 0) {
          hasScrollBar = (table.current.refs.wrappedInstance.props.height - 50) / (rowHeight * rowCount);
        }
        trackScroll(!!(hasScrollBar && hasScrollBar < 1));
      }
    },
    [rows],
  );

  useEffect(
    () => {
      if (handleSort && isFunction(handleSort)) {
        handleSort(
          {
            ...sort,
          },
          true,
        );
      }
    },
    [sort]
  );

  useEffect(
    () => {
      updatedValues.current = {
        ...updatedValues.current,
        needToScroll: true,
      };
    },
    [props.scrollTopPosition]
  );

  useEffect(
    () => {
      if (rememberScroll && props.scrollTopPosition && updatedValues.current.needToScroll) {
        setScrollTop(props.scrollTopPosition);
        updatedValues.current = {
          ...updatedValues.current,
          needToScroll: false,
        };
      } else if (updatedValues.current.scrollTop) {
        setScrollTop(undefined);
      }
    },
    [props]
  );

  const _textRenderer = useCallback<React.Element<typeof Text>>(
    (value: string): React.Element<typeof Text> => (
      <ToolTip
        title={value}
        verticalFix={15}
        horizontalFix={15}
        position="bottom-left"
      >
        <Text
          truncate
          size={16}
          multiLine={(multiLine && value && value.toString().trim().includes(' ')) ? multiLine : null}
        >
          {value}
        </Text>
      </ToolTip>
    ),
    []
  );

  const _cellRenderer = useCallback<string | number | React.Element<*>>(
    (colData: Object): string | number | React.Element<*> => {
      const {
        dataKey,
        rowIndex,
        columnData,
      } = colData;

      const currentRow = data[rowIndex] || [];

      const value = dataKey ? currentRow[dataKey] : '';

      if (columnData.render && isFunction(columnData.render)) {
        const rendValue = columnData.render(value, currentRow, rowIndex);

        if (typeof rendValue === 'string') {
          return _textRenderer(rendValue);
        }

        return rendValue;
      }

      return _textRenderer(value);
    },
    [data]
  );

  const _rowGetter = (row: Object): any => rows[row.index];

  const _handleSort = useCallback<void>(
    ({ dataKey, label }: Object): void => {
      let sortType;

      if (dataKey === sort.column) {
        sortType = sort.type === 2 ? 1 : 2;
      } else {
        sortType = 2;
      }

      setSort(
        {
          column: dataKey,
          type: sortType,
          label,
        });
    },
    [sort]
  );

  const _headerRenderer = useCallback<React.Element<typeof FlexBox>>(
    (colData: any): React.Element<typeof FlexBox> => {
      const {
        columnData,
      } = colData;

      let iconName;
      const sortable = Object.hasOwnProperty.call(columnData, 'sortable') ? columnData.sortable : true;

      if (sortable) {
        if (sort.column === columnData.dataKey) {
          iconName = sort.type === 2 ? 'sortUp' : 'sortDown';
        } else {
          iconName = 'sort';
        }
      }

      return (
        <FlexBox
          justifyContent="flex-start"
          style={{ ...columnData.headerStyle }}
        >
          <Item
            noGrow
            minWidth="0px"
            alignItems="center"
            data={{
              label: columnData.label,
              dataKey: columnData.dataKey,
            }}
            cursor={sortable ? 'pointer' : ''}
            onClick={sortable && _handleSort}
          >
            <ToolTip
              verticalFix={15}
              position="bottom-left"
              horizontalFix={15}
              title={columnData.title ? columnData.title : columnData.label}
            >
              <Text
                truncate
                size={18}
                color="white"
              >
                {columnData.label}
              </Text>
            </ToolTip>
            {sortable && (
              <Icon
                name={iconName}
                color="white"
              />
            )}
          </Item>
        </FlexBox>
      );
    },
    [sort]
  );

  const handleRowClick = useCallback<void>(
    ({ rowData, rowIndex }: any): void => {
      if (onRowClick && isFunction(onRowClick)) {
        onRowClick(rowData, rowIndex);
      }
    },
    [onRowClick]
  );

  const getRowClassName = useCallback<void>(
    (data: { index: number }): string => {
      const row = _rowGetter(data);
      const identifier = selectBy || data.index;

      if (selectedRowID && row && row[identifier] === selectedRowID) {
        return 'selected';
      }

      return '';
    },
    [
      selectBy,
      selectedRowID,
    ]
  );

  const handleOnScroll = useCallback<void>(
    ({ scrollTop }: Object): void => {
      if (rememberScroll && !firstUpdate.current) {
        if (typeof scrollGetter === 'function' && !firstUpdate.current) {
          scrollGetter(scrollTop);
        }
      }
    },
    [
      firstUpdate,
      scrollGetter,
      rememberScroll,
    ]
  );

  const _rowRenderer = useCallback<React.Element<typeof SortableTableRowRenderer>>(
    (props: Object): React.Element<typeof SortableTableRowRenderer> => {
      const disabled = Boolean(!hasDragSort || props.rowData.isProjectId);
      return <SortableTableRowRenderer {...props} disabled={disabled} />;
    },
    [hasDragSort]
  );

  // need to disable the following rule as it's needed for react-sortable-hoc
  // eslint-disable-next-line react/no-find-dom-node
  const getContainer = (wrappedInstance: Object) => ReactDOM.findDOMNode(wrappedInstance.Grid);

  const _handleDragSort = useCallback<void>(
    (sortOptions: Object) => {
      if (hasDragSort && handleDragSort && isFunction(handleDragSort)) {
        handleDragSort(sortOptions);
      }
    },
    [hasDragSort]
  );

  return (
    <Wrap
      border={border}
      pointer={!!onRowClick}
      backgroundColor={backgroundColor}
      headerBackgroundColor={headerBackgroundColor}
    >
      <SortableTable
        ref={table}
        width={width}
        distance={10}
        height={height}
        headerHeight={50}
        overscanRowCount={15}
        scrollTop={scrollTop}
        rowHeight={rowHeight}
        rowGetter={_rowGetter}
        rowCount={rows.length}
        onScroll={handleOnScroll}
        scrollToAlignment="start"
        rowRenderer={_rowRenderer}
        headerClassName="headerRow"
        onSortEnd={_handleDragSort}
        onRowClick={handleRowClick}
        getContainer={getContainer}
        helperClass="sortableHelper"
        disableHeader={disableHeader}
        rowClassName={getRowClassName}
        key={hasDragSort ? oldLength : undefined}
        rowStyle={hasDragSort && { cursor: 'grab' } || {}}
        scrollToIndex={scrollToIndex !== null ? scrollToIndex : undefined}
      >
        {(columns.map(col => {
          if (col.hide) {
            return null;
          }

          const colWidth = col.width || 100;

          return (
            <Column
              width={colWidth}
              key={col.dataKey}
              label={col.label}
              dataKey={col.dataKey}
              columnData={{ ...col }}
              flexGrow={col.flexGrow}
              flexShrink={col.flexShrink}
              cellRenderer={_cellRenderer}
              headerRenderer={_headerRenderer}
              headerStyle={col.headerStyle || {}}
              className={`tableColumn ${(col.className || '')}`}
            />
          );
        }))}
      </SortableTable>

      {renderAlternativeBody && isFunction(renderAlternativeBody) && (
        <FlexBox
          vertical
          left={0}
          top="50px"
          position="absolute"
          width={`${width}px`}
          height={`${height - 50}px`}
        >
          {renderAlternativeBody()}
        </FlexBox>
      )}
    </Wrap>
  );
};

FunctionalTable.defaultProps = {
  rememberScroll: false,
  handleDragSort: null,
  hasDragSort: false,
  trackScroll: null,
};

export default memoWrapper(FunctionalTable);
