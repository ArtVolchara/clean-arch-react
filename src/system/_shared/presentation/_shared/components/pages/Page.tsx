import { Container, SxProps } from '@mui/material';
import { Breakpoint } from '@mui/system';
import { RefObject } from 'react';

interface IPageProps {
  ref?: RefObject<HTMLDivElement>;
  sx?: SxProps,
  children?: JSX.Element | Array<JSX.Element>,
  maxWidthBreakpoint?: Breakpoint | false,
}

export default function Page(props:IPageProps) {
  const { ref, children, sx, maxWidthBreakpoint = false } = props;
  return (
    <Container ref={ref} sx={sx} maxWidth={maxWidthBreakpoint}>
      {children}
    </Container>
  );
}
