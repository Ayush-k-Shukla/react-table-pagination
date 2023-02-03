import { Avatar, Chip } from '@mui/material';
import { TableDataEntity } from '../../../classes/interface';
import styles from './single_row.module.scss';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { CustomIconButton } from '../../../../components';
import { useQuery } from 'react-query';
import { deleteUserById } from '../../../../api';

interface PropTypes {
  rowData?: TableDataEntity;
  setDeleteModal: Function;
  setEditModal: Function;
  handleUserEdit: Function;
  handleUserDelete: Function;
}

const SingleRow = ({
  rowData,
  setDeleteModal,
  setEditModal,
  handleUserDelete,
  handleUserEdit,
}: PropTypes) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.name}>
        <div className={styles.image}>
          <Avatar>{rowData?.name?.[0]}</Avatar>
        </div>
        <div className={styles.details}>
          <div className={`${styles.nameInfo} primary-text-color-large`}>
            {rowData?.name}
          </div>
          <div className={`${styles.emailInfo} secondary-text-color-small`}>
            {rowData?.email}
          </div>
        </div>
      </div>
      <div className={`${styles.status} secondary-text-color-large`}>
        <Chip
          label={rowData?.status}
          size='small'
          color={rowData?.status === 'active' ? 'warning' : 'error'}
          variant='outlined'
        />
      </div>
      <div className={`${styles.role} secondary-text-color-large`}>
        {rowData?.gender}
      </div>
      <div className={`${styles.role} secondary-text-color-large`}>
        {rowData?.id}
      </div>

      <div className={styles.buttons}>
        <CustomIconButton
          handleClick={() => {
            setDeleteModal(true);
            handleUserDelete(rowData?.id);
          }}
        >
          <DeleteOutlineRoundedIcon />
        </CustomIconButton>
        <CustomIconButton
          handleClick={() => {
            setEditModal(true);
            handleUserEdit(rowData?.id);
          }}
        >
          <EditRoundedIcon />
        </CustomIconButton>
      </div>
    </div>
  );
};

export default SingleRow;
