import { Avatar, Chip } from '@mui/material';
import { TableDataEntity } from '../../classes/interface';
import styles from './singlerow.module.scss';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { CustomIconButton } from '../../../components';

interface PropTypes {
  rowData?: TableDataEntity;
  handleDelete: (e: any) => any;
}

const SingleRow = ({ rowData, handleDelete }: PropTypes) => {
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
          label={`Active`}
          size='small'
          color='warning'
          variant='outlined'
        />
      </div>
      <div className={`${styles.role} secondary-text-color-large`}>
        {'Admin'}
      </div>
      <div className={`${styles.role} secondary-text-color-large`}>
        June 20, 2002
      </div>
      <div className={styles.buttons}>
        <CustomIconButton handleClick={handleDelete}>
          <DeleteOutlineRoundedIcon />
        </CustomIconButton>
        <CustomIconButton handleClick={() => {}}>
          <EditRoundedIcon />
        </CustomIconButton>
      </div>
    </div>
  );
};

export default SingleRow;
