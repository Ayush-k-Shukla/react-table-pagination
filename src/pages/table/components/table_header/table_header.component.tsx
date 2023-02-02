import { Chip } from '@mui/material';
import React from 'react';
import { CustomButton } from '../../../../components';
import { SUB_HEADING_MESSAGE, downloadCSV } from '../../../classes/constant';
import { TableDataEntity } from '../../../classes/interface';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import AddIcon from '@mui/icons-material/Add';
import styles from './table_header.module.scss';

interface PropTypes {
  TOTAL_USER: number;
  TableData: TableDataEntity[];
  openAdduserModal: (e: any) => any;
}

const TableHeader = ({
  TOTAL_USER,
  openAdduserModal,
  TableData,
}: PropTypes) => {
  return (
    <div className={styles.tableHeader}>
      <div className={styles.leftHeader}>
        <div className={styles.top}>
          <p className='primary-text-color-larger'>Users</p>{' '}
          <Chip
            label={`${TOTAL_USER} users`}
            size='small'
            color='success'
            variant='outlined'
          />
        </div>
        <div className={`${styles.bottom} secondary-text-color-small`}>
          <p>{SUB_HEADING_MESSAGE}</p>
        </div>
      </div>
      <div className={styles.rightHeader}>
        <CustomButton
          label='Download CSV'
          handleClick={() => downloadCSV(TableData)}
          variant='outlined'
          prependIcon={<CloudDownloadIcon />}
        />
        <CustomButton
          label='Add User'
          handleClick={openAdduserModal}
          variant='contained'
          prependIcon={<AddIcon />}
        />
      </div>
    </div>
  );
};

export default TableHeader;
