import React, { memo } from 'react';
import { Box, MenuItem, SxProps, TextField, Theme, Tooltip } from '@mui/material';

const MemoizedViewSelectCellWithTooltip = memo((props: {
  id: string | number,
  field: string,
  name: string,
  value: any,
  options: Array<{ name: string, value: string}>
  tooltipTitle: string,
  tooltipStyle?: { arrow?: SxProps, tooltip?: SxProps },
  inputStyle?: SxProps,
  theme: Theme,
  isError?: boolean,
  disabled?:boolean,
}) => {
  const { id, inputStyle, value, isError, field, name, tooltipTitle = '', tooltipStyle = {}, disabled = false, options, theme } = props;
  return (
    <Tooltip
      arrow
      title={tooltipTitle}
      slotProps={{
        arrow: { sx: tooltipStyle.arrow },
        tooltip: { sx: tooltipStyle.tooltip },
      }}
    >
      <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
        <TextField
          name={name}
          id={String(id)}
          select
          fullWidth
          margin="none"
          size="small"
          InputProps={{ readOnly: disabled, sx: { color: disabled ? theme.palette.text.disabled : undefined, ...inputStyle } }}
          SelectProps={{ displayEmpty: true, open: false }}
          value={value}
          error={isError}
        >
          {options.map((option) => (
            <MenuItem
              value={option.value}
              key={`${id}-${field}.${option.value}-view`}
            >
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Tooltip>
  );
});

export default MemoizedViewSelectCellWithTooltip;
