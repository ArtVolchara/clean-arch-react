import React, { memo } from 'react';
import { Box, SxProps, TextField, Tooltip, Theme } from '@mui/material';

const MemoizedViewNumberCellWithTooltip = memo((props: {
  id: string | number,
  field: string,
  name: string,
  value: any,
  tooltipTitle: string,
  tooltipStyle?: { arrow?: SxProps, tooltip?: SxProps },
  inputStyle?: SxProps,
  theme: Theme,
  isError?: boolean,
  min?: number,
  max?: number,
  pattern?: string,
  disabled?:boolean,
}) => {
  const { id, value, field, name, theme, tooltipStyle = {}, inputStyle, tooltipTitle, isError, disabled, pattern, min, max } = props;
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
          id={`${id}-${field}-view`}
          name={name}
          fullWidth
          type="number"
          margin="none"
          size="small"
          inputProps={{ inputMode: 'numeric', pattern, min, max }}
          InputProps={{ readOnly: disabled, sx: { color: disabled ? theme.palette.text.disabled : undefined, ...inputStyle } }}
          value={value || 0}
          error={isError}
        />
      </Box>
    </Tooltip>
  );
});

export default MemoizedViewNumberCellWithTooltip;
