import React, { memo } from 'react';
import { Box, SxProps, TextField, Theme, Tooltip } from '@mui/material';

const MemoizedViewTextCellWithTooltip = memo((props: {
  id: string | number,
  field: string,
  name: string,
  value: any,
  tooltipTitle: string,
  tooltipStyle?: { arrow?: SxProps, tooltip?: SxProps },
  inputStyle?: SxProps,
  theme: Theme,
  isError?: boolean,
  placeholder?: string,
  disabled?:boolean,
}) => {
  const { id, value, isError, field, name, tooltipStyle = {}, inputStyle, tooltipTitle, disabled, placeholder, theme } = props;
  return (
    <Tooltip
      arrow
      title={tooltipTitle}
      slotProps={{
        arrow: { sx: tooltipStyle?.arrow },
        tooltip: { sx: tooltipStyle?.tooltip },
      }}
    >
      <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
        <TextField
          id={`${id}-${field}-view`}
          name={name}
          fullWidth
          type="text"
          margin="none"
          size="small"
          InputProps={{ readOnly: disabled, sx: { color: disabled ? theme.palette.text.disabled : undefined, ...inputStyle } }}
          placeholder={placeholder}
          value={value || ''}
          error={isError}
        />
      </Box>
    </Tooltip>
  );
});

export default MemoizedViewTextCellWithTooltip;
