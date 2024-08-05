import { ITranslateMessageUseCase } from '../../../../../../Internalization/application/ports/input/ITranslateMessageUseCase';

export function getMuiDataGridLocaleConfig(translateMessage: ITranslateMessageUseCase) {
  return {
  // Root
    noRowsLabel: translateMessage({ id: 'system.table.noRows' }),
    noResultsOverlayLabel: translateMessage({ id: 'system.table.noResults' }),
    errorOverlayDefaultLabel: translateMessage({ id: 'system.table.noRows' }),

    // Density selector toolbar button text
    toolbarDensity: translateMessage({ id: 'system.table.toolbarDensity' }),
    toolbarDensityLabel: translateMessage({ id: 'system.table.toolbarDensityLabel' }),
    toolbarDensityCompact: translateMessage({ id: 'system.table.toolbarDensityCompact' }),
    toolbarDensityStandard: translateMessage({ id: 'system.table.toolbarDensityStandard' }),
    toolbarDensityComfortable: translateMessage({ id: 'system.table.toolbarDensityComfortable' }),

    // Columns selector toolbar button text
    toolbarColumns: translateMessage({ id: 'system.table.columns' }),
    toolbarColumnsLabel: translateMessage({ id: 'system.table.selectColumns' }),

    // Filters toolbar button text
    toolbarFilters: translateMessage({ id: 'system.table.filters' }),
    toolbarFiltersLabel: translateMessage({ id: 'system.table.showFilters' }),
    toolbarFiltersTooltipHide: translateMessage({ id: 'system.table.hideFilters' }),
    toolbarFiltersTooltipShow: translateMessage({ id: 'system.table.showFilters' }),
    toolbarFiltersTooltipActive: (count) => translateMessage({ id: 'system.table.activeFilters' }, { count }),

    // Export selector toolbar button text
    toolbarExport: translateMessage({ id: 'system.table.export' }),
    toolbarExportLabel: translateMessage({ id: 'system.table.export' }),
    toolbarExportCSV: translateMessage({ id: 'system.table.exportСSV' }),
    toolbarExportPrint: translateMessage({ id: 'system.table.print' }),

    // Columns panel text
    columnsPanelTextFieldLabel: translateMessage({ id: 'system.table.findColumn' }),
    columnsPanelTextFieldPlaceholder: translateMessage({ id: 'system.table.columnTitle' }),
    columnsPanelDragIconLabel: translateMessage({ id: 'system.table.columnsPanelDragIconLabel' }),
    columnsPanelShowAllButton: translateMessage({ id: 'system.table.columnsPanelShowAllButton' }),
    columnsPanelHideAllButton: translateMessage({ id: 'system.table.columnsPanelHideAllButton' }),

    // Filter panel text
    filterPanelAddFilter: translateMessage({ id: 'system.table.filterPanelAddFilter' }),
    filterPanelDeleteIconLabel: translateMessage({ id: 'system.table.filterPanelDeleteIconLabel' }),
    filterPanelLinkOperator: translateMessage({ id: 'system.table.filterPanelLinkOperator' }),
    filterPanelOperators: translateMessage({ id: 'system.table.filterPanelOperators' }),
    filterPanelOperatorAnd: translateMessage({ id: 'system.table.filterPanelOperatorAnd' }),
    filterPanelOperatorOr: translateMessage({ id: 'system.table.filterPanelOperatorOr' }),
    filterPanelColumns: translateMessage({ id: 'system.table.filterPanelColumns' }),
    filterPanelInputLabel: translateMessage({ id: 'system.table.filterPanelInputLabel' }),
    filterPanelInputPlaceholder: translateMessage({ id: 'system.table.filterPanelInputPlaceholder' }),

    // Filter operators text
    filterOperatorContains: translateMessage({ id: 'system.table.filterOperatorContains' }),
    filterOperatorEquals: translateMessage({ id: 'system.table.filterOperatorEquals' }),
    filterOperatorStartsWith: translateMessage({ id: 'system.table.filterOperatorStartsWith' }),
    filterOperatorEndsWith: translateMessage({ id: 'system.table.filterOperatorEndsWith' }),
    filterOperatorIs: translateMessage({ id: 'system.table.filterOperatorIs' }),
    filterOperatorNot: translateMessage({ id: 'system.table.filterOperatorNot' }),
    filterOperatorAfter: translateMessage({ id: 'system.table.filterOperatorAfter' }),
    filterOperatorOnOrAfter: translateMessage({ id: 'system.table.filterOperatorOnOrAfter' }),
    filterOperatorBefore: translateMessage({ id: 'system.table.filterOperatorBefore' }),
    filterOperatorOnOrBefore: translateMessage({ id: 'system.table.filterOperatorOnOrBefore' }),
    filterOperatorIsEmpty: translateMessage({ id: 'system.table.filterOperatorIsEmpty' }),
    filterOperatorIsNotEmpty: translateMessage({ id: 'system.table.filterOperatorIsNotEmpty' }),
    filterOperatorIsAnyOf: translateMessage({ id: 'system.table.filterOperatorIsAnyOf' }),

    // Filter values text
    filterValueAny: translateMessage({ id: 'system.table.filterValueAny' }),
    filterValueTrue: translateMessage({ id: 'system.table.filterValueTrue' }),
    filterValueFalse: translateMessage({ id: 'system.table.filterValueFalse' }),

    // Column menu text
    columnMenuLabel: translateMessage({ id: 'system.table.columnMenu' }),
    columnMenuShowColumns: translateMessage({ id: 'system.table.columnMenuShowColumns' }),
    columnMenuFilter: translateMessage({ id: 'system.table.columnMenuFilter' }),
    columnMenuHideColumn: translateMessage({ id: 'system.table.columnMenuHide' }),
    columnMenuUnsort: translateMessage({ id: 'system.table.columnMenuUnsort' }),
    columnMenuSortAsc: translateMessage({ id: 'system.table.columnMenuSortAsc' }),
    columnMenuSortDesc: translateMessage({ id: 'system.table.columnMenuSortDesc' }),

    // Column header text
    columnHeaderFiltersTooltipActive: (count) => translateMessage({ id: 'system.table.activeFilters' }, { count }),
    columnHeaderFiltersLabel: translateMessage({ id: 'system.table.columnHeaderFiltersLabel' }),
    columnHeaderSortIconLabel: translateMessage({ id: 'system.table.columnHeaderSortIconLabel' }),

    // Rows selected footer text
    footerRowSelected: (count) => translateMessage({ id: 'system.table.rowSelected' }, { count }),

    // Total row amount footer text
    footerTotalRows: translateMessage({ id: 'system.table.totalRows' }),

    // Total visible row amount footer text
    footerTotalVisibleRows: (visibleCount, totalCount) => translateMessage({ id: 'system.table.totalVisibleRows' }, { visibleCount, totalCount }),

    // Checkbox selection text
    checkboxSelectionHeaderName: translateMessage({ id: 'system.table.checkboxSelectionHeaderName' }),
    checkboxSelectionSelectAllRows: translateMessage({ id: 'system.table.selectAllRows' }),
    checkboxSelectionUnselectAllRows: translateMessage({ id: 'system.table.unselectAllRows' }),
    checkboxSelectionSelectRow: translateMessage({ id: 'system.table.selectRow' }),
    checkboxSelectionUnselectRow: translateMessage({ id: 'system.table.unselectRow' }),

    // Boolean cell text
    booleanCellTrueLabel: translateMessage({ id: 'system.table.booleanCellTrueLabel' }),
    booleanCellFalseLabel: translateMessage({ id: 'system.table.booleanCellFalseLabel' }),

    // Actions cell more text
    actionsCellMore: translateMessage({ id: 'system.table.actionsCellMore' }),

    // Column pinning text
    pinToLeft: translateMessage({ id: 'system.table.pinToLeft' }),
    pinToRight: translateMessage({ id: 'system.table.pinToRight' }),
    unpin: translateMessage({ id: 'system.table.unpin' }),

    // Tree Data
    treeDataGroupingHeaderName: translateMessage({ id: 'system.table.groupingHeaderName' }),
    treeDataExpand: translateMessage({ id: 'system.table.expand' }),
    treeDataCollapse: translateMessage({ id: 'system.table.collapse' }),

    // Grouping columns
    groupingColumnHeaderName: translateMessage({ id: 'system.table.groupingHeaderName' }),
    groupColumn: (name) => translateMessage({ id: 'system.table.groupColumn' }, { name }),
    unGroupColumn: (name) => translateMessage({ id: 'system.table.ungroupColumn' }, { name }),

    // Master/detail
    expandDetailPanel: translateMessage({ id: 'system.table.expand' }),
    collapseDetailPanel: translateMessage({ id: 'system.table.collapse' }),

    // Used core components translation keys
    MuiTablePagination: {},
  };
}
