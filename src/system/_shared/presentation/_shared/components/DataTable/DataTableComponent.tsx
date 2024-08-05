import React, {useCallback, useEffect, useMemo} from 'react';
import {
  DataGrid,
  GridCellModes,
  GridCellModesModel,
  GridCellParams, GridRowModel,
  GridRowModesModel,
  MuiEvent, useGridApiRef, GridPaginationModel,
} from '@mui/x-data-grid';
import { GridRowId } from '@mui/x-data-grid/models/gridRows';
import { GridRowClassNameParams } from '@mui/x-data-grid/models/params/gridRowParams';
import { Box, useTheme } from '@mui/material';
import { DataGridProps } from '@mui/x-data-grid/models/props/DataGridProps';
import { ITranslateMessageUseCase } from '../../../../../Internalization/application/ports/input/ITranslateMessageUseCase';
import { getMuiDataGridLocaleConfig } from './utils/MuiDataGridLocaleConfig';

interface IDataTableComponentProps<R extends { [key: string]: any, isNew?: boolean }> extends Omit<DataGridProps<R>, 'processRowUpdate'> {
  onRowUpdate?: (newRow: GridRowModel<R>, oldRow?: GridRowModel<R>) => void,
  onPageChange?: (page:number) => void,
  editMode?: 'cell' | 'row',
  translateMessage: ITranslateMessageUseCase
}
export default function DataTableComponent<R extends { [key: string]: any, isNew?: boolean }>(props: IDataTableComponentProps<R>) {
  const {
    columns,
    rows,
    apiRef: ref,
    rowModesModel,
    cellModesModel,
    paginationModel,
    onPaginationModelChange,
    onRowUpdate = (newRow: GridRowModel<R>, oldRow?: R) => {},
    getCellClassName = (params: GridCellParams<any, R>) => '',
    getRowClassName = (params: GridRowClassNameParams<R>) => '',
    isCellEditable,
    autoPageSize = true,
    editMode = 'cell',
    translateMessage,
    ...rest
  } = props;
  const defaultRef = useGridApiRef();
  const apiRef = ref || defaultRef;
  const theme = useTheme();
  const [isApiReady, setIsApiReady] = React.useState<boolean>(false);
  const [localRowModesModel, setLocalRowModesModel] = React.useState<GridRowModesModel>(rowModesModel);
  const [localCellModesModel, setLocalCellModesModel] = React.useState<GridCellModesModel>({});
  const [localPaginationModel, setLocalPaginationModel] = React.useState<GridPaginationModel>({ page: 0, pageSize: 10 });

  useEffect(() => {
    setIsApiReady(true);
  }, []);

  useEffect(() => {
    setLocalRowModesModel(rowModesModel || {});
  }, [rowModesModel]);

  useEffect(() => {
    setLocalCellModesModel(cellModesModel || {});
  }, [cellModesModel]);

  useEffect(() => {
    if (!onPaginationModelChange && isApiReady) {
      setLocalPaginationModel(paginationModel);
    }
  }, [paginationModel, isApiReady]);

  function handleSelectRow(mode: 'view' | 'edit', currentRowId: number) {
    if (mode === 'view') {
      const selectedRows = apiRef?.current?.getSelectedRows();
      const newSelectedRows = [] as GridRowId[];
      if (!selectedRows.has(currentRowId)) {
        newSelectedRows.push(currentRowId);
      }
      apiRef?.current?.setRowSelectionModel(newSelectedRows);
    }
  }

  const handleCellClick = useCallback((params: GridCellParams, event: MuiEvent<React.MouseEvent>) => {
    // if (!event.currentTarget.contains(event.target as Element)) {
    //   return;
    // }
    if (params.isEditable) {
      setLocalCellModesModel((prevGridModesModel) => ({
        ...Object.keys(prevGridModesModel).reduce(
          (oldRowModesModel, rowId) => ({
            ...oldRowModesModel,
            [rowId]: Object.keys(prevGridModesModel[rowId]).reduce(
              (oldCellModesModel, field) => ({
                ...oldCellModesModel,
                [field]: { mode: GridCellModes.View },
              }),
              {},
            ),
          }),
          {},
        ),
        [params.id]: {
          ...Object.keys(prevGridModesModel[params.id] || {}).reduce(
            (oldCellModesModel, field) => ({ ...oldCellModesModel, [field]: { mode: GridCellModes.View } }),
            {},
          ),
          [params.field]: {
            mode: GridCellModes.Edit,
          },
        },
      }));
    }
    handleSelectRow(params.cellMode, params.row.id);
  }, []);

  const handleCellModesModelChange = useCallback((newModel) => {
    setLocalCellModesModel(newModel);
  }, []);

  const handleGetCellClassName = useCallback((params: GridCellParams<any, R>) => {
    const className = getCellClassName(params);
    return params.isEditable ? className : `${className} disabled-cell`;
  }, [getCellClassName]);

  const handleGetRowCellClassName = useCallback((params: GridRowClassNameParams<R>) => {
    const className = getRowClassName(params);
    return params.row.isNew ? `${className} new-row` : '';
  }, [getRowClassName]);

  const handleRowUpdate = useCallback(async (newRow: GridRowModel<R>, oldRow: R) => {
    onRowUpdate(newRow, oldRow);
    return newRow;
  }, [onRowUpdate]);

  // const handlePaginationModelChange = useCallback((updatedPaginationModel, details) => {
  //   const newPaginationModel = { ...updatedPaginationModel, pageSize: updatedPaginationModel.pageSize > 0 ? updatedPaginationModel.pageSize : 0 };
  //   if (onPaginationModelChange) {
  //     if (isApiReady) {
  //       onPaginationModelChange(newPaginationModel, details);
  //     }
  //   } else if (isApiReady) {
  //     setLocalPaginationModel(newPaginationModel);
  //   }
  // }, [isApiReady, onPaginationModelChange]);

  const localeText = useMemo(() => getMuiDataGridLocaleConfig(translateMessage), []);

  return (
    <Box
      sx={{
        height: '100%',
        '& fieldset': { border: 'none' },
        '& .new-row': {
          background: theme.palette.action.selected,
        },
        '& .new-row:hover': {
          backgroundColor: theme.palette.action.focus,
        },
        '& .disabled-cell': {
          color: theme.palette.action.disabled,
        },
        '.MuiDataGrid-root': {
          '& .MuiDataGrid-columnHeader': {
            pl: 1,
            pr: 1,
          },
          '& .MuiDataGrid-cell': {
            pl: 1,
            pr: 1,
            '&--withRenderer': {
              p: 0,
            },
            '& .MuiFormControl-root': {
              height: '100%',
              '> .Mui-error': {
                // backgroundColor: getRgbWithOpacityFromHexColor(theme.palette.error.main),
                backgroundColor: theme.palette.error.main,
                color: theme.palette.error.contrastText,
                '& .MuiSvgIcon-root': {
                  color: 'inherit',
                },
              },
            },
            '& .MuiAutocomplete-root': {
              height: '100%',
              width: '100%',
              '& .MuiFormControl-root': {
                height: '100%',
                width: '100%',
              },
              '&.MuiAutocomplete-hasClearIcon': {
                '.MuiInputBase-root': {
                  height: '100%',
                  '& .MuiInputBase-root': {
                    borderColor: theme.palette.error.main,
                  },
                },
              },
            },
            '& .MuiInputBase-root': {
              fontSize: 'inherit',
              height: '100%',
              pl: 1,
              pr: 4,
              borderRadius: 0,
              fieldset: {
                p: 0,
                width: '100%',
                top: 'unset',
              },
              '& .MuiInputBase-input': {
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                fontSize: 'inherit',
                p: 0,
              },
              '& .MuiSelect-nativeInput': {
                height: '100%',
              },
              '& .MuiAutocomplete-endAdornment': {
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                right: '0',
              },
            },
            '&.MuiDataGrid-cell--editing': {
              p: 0,
              pt: 'initial',
              pb: 'initial',
            },
          },
        },
      }}
    >
      <DataGrid
        {...rest}
        // paginationModel={paginationModel || localPaginationModel}
        // onPaginationModelChange={handlePaginationModelChange}
        disableRowSelectionOnClick
        cellModesModel={localCellModesModel}
        onCellModesModelChange={handleCellModesModelChange}
        onCellClick={handleCellClick}
        apiRef={apiRef}
        autoPageSize={autoPageSize}
        localeText={localeText}
        editMode={editMode}
        columns={columns}
        rows={rows}
        density="compact"
        rowModesModel={localRowModesModel}
        processRowUpdate={handleRowUpdate}
        isCellEditable={isCellEditable}
        getCellClassName={handleGetCellClassName}
        getRowClassName={handleGetRowCellClassName}
      />
    </Box>
  );
}
