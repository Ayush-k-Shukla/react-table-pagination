import { IconButton } from '@mui/material';
import { ReactNode } from 'react';

interface PropTypes {
  handleClick: (e: any) => any;
  children: ReactNode;
}

const CustomIconButton = ({ children, handleClick }: PropTypes) => {
  return (
    <IconButton onClick={handleClick} size='small'>
      {children}
    </IconButton>
  );
};

export default CustomIconButton;
