import React from 'react';
import { Menu, MenuItem } from '@mui/material';

interface ComponentWithMenuProps {
  component: JSX.Element;
  options: Array<{ value: any, title: string, onSelect: (value:any) => void }>
}

export default function ComponentWithMenu(props:ComponentWithMenuProps) {
  const { component, options = [] } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {React.Children.map(component, (child, index) => {
        const { onClick = () => {} } = child.props;
        return React.cloneElement(child, {
          id: 'demo-positioned-button',
          'aria-controls': open ? 'demo-positioned-menu' : undefined,
          'aria-haspopup': 'true',
          'aria-expanded': open ? 'true' : undefined,
          onClick: (e) => {
            onClick(e);
            handleClick(e);
          },
        });
      })}
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={`${option.title}`}
            onClick={() => {
              option.onSelect(option.value);
              handleClose();
            }}
          >
            {option.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
