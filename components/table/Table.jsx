import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import HeaderTable from './HeaderTable'
import BodyTable from './BodyTable'
import TableContext from './context'
import classnames from 'classnames'
import { getFixedDataByFixedColumn, getScrollBarSize, flatTreeData, parseFixedcolumns } from './util'
import Pagination from '../pagination'
import axios from 'axios'
import _ from 'lodash'
import FixedBodyTable from './FixedBodyTable'
import Provider from '../context'
import Loading from '../loading'
import './style'
const DEFAULTWIDTH = 100
const defaultHeaderRow = () => {
  return {
    onClick: () => {},
    onDoubleClick: () => {},
    onContextMenu: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {}
  }
}

const Table = ({
  striped,
  bordered,
  resizable,
  size,
  errorRowKeys = [],
  rowSelection,
  data,
  highlightedRowKeys = [],
  highlightedColKeys = [],
  expandedRowKeys,
  onExpand,
  onHeaderRow = defaultHeaderRow,
  columns: propsColumns = [],
  expandedRender,
  maxHeight,
  pagination,
  dataSource,
  showColMenu,
  showColHighlight,
  prefix = 'hi-table',
  fixedToColumn,
  sticky: _ceiling,
  stickyTop = 0,
  setting,
  onLoadChildren,
  rowExpandable = () => true,
  // *********
  sortCol,
  setSortCol,
  visibleCols,
  setVisibleCols,
  setCacheVisibleCols,
  scrollWidth,
  theme,
  localeDatas,
  emptyContent = localeDatas.table.emptyContent
}) => {
  const [columns, setColumns] = useState(propsColumns)
  const hiTable = useRef(null)
  const disabledData = useRef([])
  const [ceiling, setCeiling] = useState(false)
  const [activeSorterColumn, setActiveSorterColumn] = useState(null)
  const [activeSorterType, setActiveSorterType] = useState(null)
  const [highlightColumns, setHighlightColumns] = useState([])
  const [highlightRows, setHighlightRows] = useState([])
  const [freezeColumn, setFreezeColumn] = useState(null)
  const [hoverRow, setHoverRow] = useState(null)
  const [serverTableConfig, setServerTableConfig] = useState({ data: [], columns: [] })
  const [eachRowHeight, setEachRowHeight] = useState({})
  const [eachHeaderHeight, setEachHeaderHeight] = useState(null)
  const [hoverColIndex, setHoverColIndex] = useState(null)
  const loadChildren = useRef(null)
  const [realColumnsWidth, setRealColumnsWidth] = useState(columns.map((c) => c.width || 'auto'))
  const [expandedTreeRows, setExpandedTreeRows] = useState([])
  // 固定列的宽度
  const [fixedColumnsWidth, setFixedColumnsWidth] = useState({ left: 0, right: 0 })
  // 获取左右侧固定列的信息
  const [realLeftFixedColumns, setRealLeftFixedColumns] = useState([])
  const [realRightFixedColumns, setRealRightFixedColumns] = useState([])
  // 拉平后的数据
  const [flattedColumns, setFlattedColumns] = useState([])
  // scrollLeft
  const [scrollSize, setScrollSize] = useState({ scrollLeft: 0, scrollRight: 1 })
  const firstRowRef = useRef(null)
  // 处理拉平数据
  useEffect(() => {
    const _columns = propsColumns.concat()
    const _flattedColumns = flatTreeData(_columns)
    const leftFixedColumn =
      freezeColumn || (typeof fixedToColumn === 'string' ? fixedToColumn : fixedToColumn && fixedToColumn.left)
    const rightFixedColumn = fixedToColumn && fixedToColumn.right
    // 获取冻结类列的下标
    let leftFixedIndex, rightFixedIndex
    console.log('_flattedColumns', _flattedColumns)
    _flattedColumns.forEach((c, index) => {
      if (leftFixedColumn === c.dataKey && typeof leftFixedColumn === 'string') leftFixedIndex = c._rootIndex
      if (rightFixedColumn === c.dataKey && typeof rightFixedColumn === 'string') rightFixedIndex = c._rootIndex
    })
    if (typeof leftFixedIndex === 'number' || rightFixedIndex === 'number') {
      const lastColumns = _columns.filter((item) => {
        return typeof item.isLast !== 'undefined' ? item.isLast : true
      })
      _columns.forEach((item) => {
        if (item.dataKey) {
          const defaultWidth = scrollWidth ? scrollWidth / lastColumns.length : 100
          item.width = item.width ? item.width : defaultWidth
        }
      })
    }
    // 左侧
    const leftCloumns = _columns.slice(0, leftFixedIndex + 1)
    leftCloumns.forEach((currentItem, index) => {
      parseFixedcolumns(currentItem, index, leftCloumns, 'leftStickyWidth', rowSelection)
      _columns[index] = currentItem
    })
    // 右侧
    const rightCloumns = _.cloneDeep(_columns.slice(rightFixedIndex || flattedColumns.length).reverse())
    if (rightFixedIndex) {
      rightCloumns.forEach((currentItem, index) => {
        const _item = parseFixedcolumns(currentItem, index, rightCloumns, 'rightStickyWidth', rowSelection)
        _columns[_columns.length - 1 - index] = _item
      })
    }
    setRealLeftFixedColumns(leftCloumns)
    setRealRightFixedColumns(rightCloumns)
    setColumns(_columns)
    setFlattedColumns(_flattedColumns)
  }, [propsColumns, freezeColumn, data])

  // 获取列宽的处理
  useEffect(() => {
    disabledData.current = []
    if (!dataSource) {
      if (firstRowRef.current) {
        const _realColumnsWidth = Array.from(firstRowRef.current.childNodes).map((node) => node.clientWidth)
        setRealColumnsWidth(_realColumnsWidth)
      }
    }
  }, [columns, dataSource, data])

  // 有表头分组那么也要 bordered
  const _bordered = flattedColumns.length > columns.length || bordered

  // 计算固定列的宽度

  useEffect(() => {
    let left = 0
    let right = 0
    realLeftFixedColumns.reduce((pre, current) => {
      const currentWIdth = current.width
      left = pre + currentWIdth
      return left
    }, left)
    realRightFixedColumns.reduce((pre, current) => {
      const currentWIdth = current.width
      right = pre + currentWIdth
      return right
    }, right)
    if (left > 0 && rowSelection) {
      left += 50
    }
    setFixedColumnsWidth({ left, right })
  }, [realLeftFixedColumns, realRightFixedColumns])

  // 同步滚动条
  const headerTableRef = useRef(null)
  const stickyHeaderRef = useRef(null)
  const bodyTableRef = useRef(null)
  const leftFixedBodyTableRef = useRef(null)
  const rightFixedBodyTableRef = useRef(null)
  const tableRef = useRef(null)

  // 新增滚动优化
  const syncScrollLeft = (scrollLeft, syncTarget) => {
    let scrollRight = true
    if (syncTarget && syncTarget.scrollLeft !== scrollLeft) {
      syncTarget.scrollLeft = scrollLeft
    }
    if (tableRef && tableRef.current && bodyTableRef && bodyTableRef.current) {
      const { right: tableTefRight } = tableRef.current.getBoundingClientRect()
      const { right } = bodyTableRef.current.getBoundingClientRect()
      scrollRight = tableTefRight - right
    }
    setScrollSize({ scrollLeft, scrollRight })
  }
  const syncScrollTop = (scrollTop, syncTarget) => {
    if (syncTarget && syncTarget.scrollTop !== scrollTop) {
      syncTarget.scrollTop = scrollTop
    }
  }

  const _pagination = (dataSource && serverTableConfig.pagination) || pagination
  // 高亮行
  const _highlightRows = highlightedRowKeys.concat(highlightRows.filter((row) => !highlightedRowKeys.includes(row.key)))
  // 需要右对齐的列
  const alignRightColumns = columns.filter((c) => c.align === 'right').map((col) => col.dataKey)
  // baseTable
  const baseTable = useRef(null)
  const [baseTableWidth, setBaseTableWidth] = useState('100%')
  const clientWidth = baseTable.current && baseTable.current.clientWidth
  useEffect(() => {
    setBaseTableWidth(clientWidth)
  }, [clientWidth])

  // useEffect(() => {
  //   if (_ceiling) {
  //     window.addEventListener(
  //       'scroll',
  //       (e) => {
  //         if (
  //           hiTable &&
  //           hiTable.current &&
  //           hiTable.current.getBoundingClientRect().top <= stickyTop &&
  //           hiTable.current.getBoundingClientRect().bottom >= stickyTop + 35
  //         ) {
  //           setCeiling(true)
  //           syncScrollLeft(bodyTableRef.current.scrollLeft, stickyHeaderRef.current)
  //         } else {
  //           console.log(e)
  //           setCeiling(false)
  //         }
  //       },
  //       true
  //     )
  //   }
  // }, [_ceiling, stickyTop])

  useEffect(() => {
    if (dataSource) {
      const fetchConfig = dataSource()
      axios(fetchConfig).then((res) => {
        setServerTableConfig(res.data)
      })
    }
  }, [dataSource])
  return (
    <TableContext.Provider
      value={{
        disabledData,
        rowExpandable,
        setting,
        firstRowRef,
        prefix,
        errorRowKeys,
        bordered: _bordered,
        resizable,
        rowSelection,
        highlightedRowKeys: _highlightRows,
        setHighlightRows,
        highlightedColKeys,
        tableRef,
        data: dataSource ? serverTableConfig.data : data,
        columns: dataSource ? serverTableConfig.columns : columns,
        expandedRender,
        expandedRowKeys,
        // 标题点击回调事件
        onHeaderRow,
        onExpand,
        realColumnsWidth,
        setRealColumnsWidth,
        ceiling,
        stickyTop,
        scrollBarSize: getScrollBarSize(), // 滚动条宽度
        // 排序逻辑
        activeSorterColumn,
        activeSorterType,
        setActiveSorterColumn: setActiveSorterColumn,
        setActiveSorterType: setActiveSorterType,
        // 高亮列
        highlightColumns,
        setHighlightColumns,
        // 冻结列
        freezeColumn,
        setFreezeColumn,
        // hover 高亮行
        hoverRow,
        setHoverRow,
        // hover 高亮列
        hoverColIndex,
        setHoverColIndex,
        showColMenu,
        // 是否展示hover高亮列
        showColHighlight,
        maxHeight,
        // 同步滚动条
        headerTableRef,
        stickyHeaderRef,
        bodyTableRef,
        syncScrollLeft,
        leftFixedBodyTableRef,
        rightFixedBodyTableRef,
        syncScrollTop,
        alignRightColumns,
        // setting 列操作相关
        sortCol,
        setSortCol,
        visibleCols,
        setVisibleCols,
        setCacheVisibleCols,
        // 出现横向滚动条时的宽度
        scrollWidth,
        // 同步行高度
        eachRowHeight,
        setEachRowHeight,
        // 同步表头高度
        eachHeaderHeight,
        setEachHeaderHeight,
        theme,
        localeDatas,
        expandedTreeRows,
        setExpandedTreeRows,
        onLoadChildren,
        loadChildren
      }}
    >
      <div
        className={classnames(prefix, `theme__${theme}`, {
          [`${prefix}--striped`]: striped,
          [`${prefix}--bordered`]: _bordered,
          [`${prefix}--${size}`]: size
        })}
        ref={hiTable}
      >
        {/* Normal table 普通表格 */}
        <div className={`${prefix}__container`} ref={baseTable}>
          <HeaderTable bodyWidth={baseTableWidth} />
          <BodyTable fatherRef={hiTable} emptyContent={emptyContent} />
          {/* 显示阴影 */}
          {scrollSize.scrollLeft > 0 && realLeftFixedColumns.length > 0 && (
            <div
              className={`${prefix}__shadow-mask  ${prefix}__shadow-left`}
              style={{ width: fixedColumnsWidth.left + 'px' }}
            >
              <div className={`${prefix}__shadow-lock`}></div>
            </div>
          )}
          {scrollSize.scrollRight > 0 && realRightFixedColumns.length > 0 && (
            <div
              className={`${prefix}__shadow-mask ${prefix}__shadow-right`}
              style={{ width: fixedColumnsWidth.right + 'px' }}
            >
              <div className={`${prefix}__shadow-lock `}></div>
            </div>
          )}
        </div>
        {/* 使用 sticky 重构 */}
        {/* Left fixed table 左侧固定列表格 */}
        {/* {leftFixedColumn && realLeftFixedColumns.length > 0 && (
          <div className={classnames(`${prefix}__container`, `${prefix}__container--fixed-left`)}>
            <HeaderTable isFixed="left" />
            <FixedBodyTable isFixed="left" />
          </div>
        )} */}
        {/* Right fixed table 右侧固定列表格 */}
        {/* {rightFixedColumn && realRightFixedColumns.length > 0 && (
          <div className={classnames(`${prefix}__container`, `${prefix}__container--fixed-right`)} style={{ right: 0 }}>
            <HeaderTable isFixed="right" rightFixedIndex={rightFixedIndex} />
            <FixedBodyTable isFixed="right" rightFixedIndex={rightFixedIndex} />
          </div>
        )} */}
        {/* Pagination 分页组件 */}
        {_pagination && (
          <div
            className={classnames(`${prefix}__pagination`, {
              [`${prefix}__pagination--${_pagination.placement}`]: _pagination.placement
            })}
          >
            <Pagination {..._pagination} />
          </div>
        )}
      </div>
    </TableContext.Provider>
  )
}

const TableWrapper = ({ columns, uniqueId, standard, data, loading, ...settingProps }) => {
  const _sortCol =
    uniqueId && window.localStorage.getItem(`${uniqueId}_sortCol`)
      ? JSON.parse(window.localStorage.getItem(`${uniqueId}_sortCol`))
      : columns

  const _visibleCols =
    uniqueId && window.localStorage.getItem(`${uniqueId}_visibleCols`)
      ? JSON.parse(window.localStorage.getItem(`${uniqueId}_visibleCols`))
      : columns

  const _cacheVisibleCols =
    uniqueId && window.localStorage.getItem(`${uniqueId}_cacheVisibleCols`)
      ? JSON.parse(window.localStorage.getItem(`${uniqueId}_cacheVisibleCols`))
      : columns
  // 列操作逻辑
  const [sortCol, setSortCol] = useState(_sortCol)
  const [visibleCols, setVisibleCols] = useState(_visibleCols)
  const [cacheVisibleCols, setCacheVisibleCols] = useState(_cacheVisibleCols)
  useEffect(() => {
    if (uniqueId) {
      window.localStorage.setItem(`${uniqueId}_sortCol`, JSON.stringify(sortCol))
      window.localStorage.setItem(`${uniqueId}_visibleCols`, JSON.stringify(visibleCols))
      window.localStorage.setItem(`${uniqueId}_cacheVisibleCols`, JSON.stringify(cacheVisibleCols))
    }
  }, [sortCol, visibleCols, cacheVisibleCols, uniqueId])

  useEffect(() => {
    setCacheVisibleCols(_cacheVisibleCols)
  }, [_cacheVisibleCols])

  const standardPreset = standard
    ? {
        showColMenu: true,
        sticky: true,
        bordered: true,
        setting: true,
        striped: true
      }
    : {}

  // ***************
  return loading !== undefined ? (
    <Loading visible={loading}>
      <Table
        columns={cacheVisibleCols}
        data={data || []}
        {...settingProps}
        {...standardPreset}
        sortCol={sortCol}
        setSortCol={setSortCol}
        visibleCols={visibleCols}
        setVisibleCols={setVisibleCols}
        setCacheVisibleCols={setCacheVisibleCols}
      />
    </Loading>
  ) : (
    <Table
      columns={cacheVisibleCols}
      data={data || []}
      {...settingProps}
      {...standardPreset}
      sortCol={sortCol}
      setSortCol={setSortCol}
      visibleCols={visibleCols}
      setVisibleCols={setVisibleCols}
      setCacheVisibleCols={setCacheVisibleCols}
    />
  )
}

export default Provider(TableWrapper)
