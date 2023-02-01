import { useState } from 'react';
import { TableDataEntity } from '../classes/interface';
import styles from './table.module.scss';
import {
  Data,
  downloadCSV,
  sortData,
  SUB_HEADING_MESSAGE,
} from '../classes/constant';
import SingleRow from './singlerow/singlerow.component';
import { CustomButton, CustomModal, CustomPagination } from '../../components';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import AddIcon from '@mui/icons-material/Add';
import CustomInput from '../../components/CustomInput';
import Chip from '@mui/material/Chip/Chip';

const TablePage = () => {
  const [TableData, setTableData] = useState<TableDataEntity[]>(Data);
  const [adduserModal, setAddUserModal] = useState<boolean>(false);
  const [deleteuserModal, setDeleteUserModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);

  const openAdduserModal = () => {
    setAddUserModal(true);
  };
  const openDeleteuserModal = () => {
    setDeleteUserModal(true);
  };

  const saveUser = () => {};

  const changeActivePage = (page: number) => {
    setCurrentPage(page);
  };

  const PAGE_LIMIT = 5;
  return (
    <>
      {/** Modal to add user */}
      <CustomModal
        open={adduserModal}
        discardLabel='Cancel'
        saveLabel='Save'
        title='Add User'
        onDiscard={() => setAddUserModal(false)}
        onSave={saveUser}
      >
        <div className={styles.addUser}>
          <CustomInput
            handleValueChange={() => {}}
            value=''
            fullWidth
            label='Name'
            name='name'
            placeholder='Enter name'
            type='text'
          />
          <CustomInput
            handleValueChange={() => {}}
            value=''
            fullWidth
            label='Email'
            name='email'
            placeholder='Enter email'
            type='text'
          />
          <CustomInput
            handleValueChange={() => {}}
            value=''
            fullWidth
            label='Role'
            name='role'
            placeholder='Enter role'
            type='text'
          />
          <CustomInput
            handleValueChange={() => {}}
            value=''
            fullWidth
            label='Name'
            name='name'
            placeholder='Enter name'
            type='text'
          />
        </div>
      </CustomModal>

      {/** Modal to delete user */}
      <CustomModal
        open={deleteuserModal}
        discardLabel='No'
        saveLabel='Yes'
        title='Delete User'
        onDiscard={() => setDeleteUserModal(false)}
        onSave={saveUser}
      >
        <div className={styles.addUser}>Are you sure to delete this user?</div>
      </CustomModal>

      <div className={styles.parent}>
        <div className={styles.parentWrapper}>
          {/** Header of the table*/}
          <div className={styles.tableHeader}>
            <div className={styles.leftHeader}>
              <div className={styles.top}>
                <p className='primary-text-color-larger'>Users</p>{' '}
                <Chip
                  label={`${TableData.length} users`}
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

          <hr className={styles.devider} />

          {/** table content*/}
          <div className={styles.tableContent}>
            <div className={styles.colums}>
              <div
                className={styles.name}
                onClick={() => {
                  sortData(TableData, 'name');
                }}
              >
                <p>Name</p>
                <ArrowUpwardOutlinedIcon />
              </div>
              <div className={styles.status}>
                <p>Status</p>
                <ArrowDownwardOutlinedIcon />
              </div>
              <div className={styles.role}>
                <p>Role</p>
                <ArrowUpwardOutlinedIcon />
              </div>
              <div className={styles.login}>
                <p>Last login</p>
                <ArrowDownwardOutlinedIcon />
              </div>
              <div className={styles.login}></div>
            </div>
            <hr className={styles.devider} />
            {TableData?.map((row, index) => {
              return (
                <>
                  {index > (currentPage - 1) * PAGE_LIMIT &&
                    index <= currentPage * PAGE_LIMIT && (
                      <>
                        <SingleRow
                          rowData={row}
                          handleDelete={openDeleteuserModal}
                        />
                        <hr className={styles.devider} />
                      </>
                    )}
                </>
              );
            })}

            <CustomPagination
              currentPage={currentPage}
              showPerPage={PAGE_LIMIT}
              setCurrentPage={changeActivePage}
              total={TableData.length}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TablePage;
