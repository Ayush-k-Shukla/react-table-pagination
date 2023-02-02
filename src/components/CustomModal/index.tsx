import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { ReactNode } from 'react';
import CustomButton from '../CustomButton';

interface PropTypes {
  children: ReactNode;
  open: boolean;
  title: string;
  onSave: (e: any) => void;
  onDiscard: (e: any) => void;
  saveLabel: string;
  discardLabel: string;
  loading?: boolean;
}

const CustomModal = ({
  children,
  open,
  discardLabel,
  onDiscard,
  onSave,
  saveLabel,
  title,
  loading = false,
}: PropTypes) => {
  return (
    <Dialog open={open} onClose={onDiscard} maxWidth='xs' fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <CustomButton
          label={discardLabel}
          handleClick={onDiscard}
          variant='outlined'
        />

        <CustomButton
          label={saveLabel}
          handleClick={onSave}
          variant='outlined'
          loading={loading}
        />
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;
