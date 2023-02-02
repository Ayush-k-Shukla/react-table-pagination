import { useEffect, useState } from 'react';
import { TableDataEntity } from '../classes/interface';
import { QueryClient } from 'react-query';
import { useQuery } from 'react-query';
import styles from './table.module.scss';
import {
  Data,
  downloadCSV,
  sortData,
  SUB_HEADING_MESSAGE,
} from '../classes/constant';
import SingleRow from './components/single_row/single_row.component';
import {
  CustomButton,
  CustomDropDown,
  CustomModal,
  CustomPagination,
} from '../../components';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import AddIcon from '@mui/icons-material/Add';
import CustomInput, {
  CustomInputChangeFuncInterface,
} from '../../components/CustomInput';
import {
  createUser,
  deleteUserById,
  getUsers,
  updateUserById,
} from '../../api';
import Chip from '@mui/material/Chip/Chip';
import TableHeader from './components/table_header/table_header.component';
const PAGE_LIMIT = 10;
const TOTAL_USER = 2500;

const TablePage = () => {
  const [TableData, setTableData] = useState<TableDataEntity[]>([{}]);
  const [singleUserData, setSingleUserData] = useState<TableDataEntity>({});
  const [adduserModal, setAddUserModal] = useState<boolean>(false);
  const [deleteuserModal, setDeleteUserModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletedId, setDeletedId] = useState(1);

  const [filterState, setFilterState] = useState({
    name: 1,
    status: 1,
    gender: 1,
    id: 1,
  });

  const {
    data: usersData,
    error: getUsersError,
    isLoading: getUserLoading,
    refetch: getUsersRefetch,
    isSuccess: getUsersSuccess,
  } = useQuery<TableDataEntity[], Error>(
    'getUsers',
    async () => {
      return await getUsers({ page: currentPage });
    },
    { enabled: false, retry: false }
  );

  const {
    data: deleteUserData,
    error: deleteUserError,
    isLoading: deleteUserLoading,
    refetch: deleteUserRefetch,
    isSuccess: deleteUserSuccess,
  } = useQuery(
    'deleteUser',
    async () => {
      return await deleteUserById({ id: deletedId });
    },
    { enabled: false, retry: false }
  );

  const {
    data: updateUserData,
    error: updateUserError,
    isLoading: updateUserLoading,
    refetch: updateUserRefetch,
    isSuccess: updateUsersSuccess,
  } = useQuery(
    'updateUser',
    async () => {
      return await updateUserById({
        id: singleUserData.id!,
        data: singleUserData,
      });
    },
    { enabled: false, retry: false }
  );

  const {
    status: createUserStatus,
    data: createUserData,
    error: createUserError,
    isLoading: createUserLoading,
    refetch: createUserRefetch,
    isSuccess: createUsersSuccess,
  } = useQuery(
    'createUser',
    async () => {
      return await createUser({
        data: singleUserData,
      });
    },
    { enabled: false, retry: false }
  );

  useEffect(() => {
    if (usersData) {
      setTableData(usersData);
    }
  }, [getUserLoading, currentPage]);

  useEffect(() => {
    setDeleteUserModal(false);
  }, [deleteUserSuccess]);

  useEffect(() => {
    getUsersRefetch();
  }, [currentPage]);

  const handleUserDelete = (id: number) => {
    setDeletedId(id);
  };

  const handleUserEdit = (id: number) => {
    const dataById: TableDataEntity[] = TableData.filter(
      (data) => id === data.id
    );
    setSingleUserData(dataById[0]);
  };

  console.log({ TableData });

  const changeUserInfo = (e: CustomInputChangeFuncInterface) => {
    setSingleUserData({ ...singleUserData, [e.name]: e.value });
  };

  const applyFilter = (filterType: string) => {
    const INV = -1;
    const filteredData = sortData(
      TableData,
      filterType,
      INV * filterState[filterType]
    );
    setFilterState({
      ...filterState,
      [filterType]: INV * filterState[filterType],
    });
    setTableData([...filteredData]);
  };

  const openAdduserModal = () => {
    setSingleUserData({});
    setAddUserModal(true);
  };

  const saveUser = () => {
    if (singleUserData.id) {
      createUserRefetch();
    } else {
      updateUserRefetch();
    }
  };

  const deleteUser = () => {
    deleteUserRefetch();
  };

  const changeActivePage = (page: number) => {
    setCurrentPage(page);
  };

  console.log({ singleUserData });

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
        loading={createUserLoading || updateUserLoading}
      >
        <div className={styles.addUser}>
          <CustomInput
            handleValueChange={changeUserInfo}
            value={singleUserData.name || ''}
            fullWidth
            label='Name'
            name='name'
            placeholder='Enter name'
            type='text'
          />
          <CustomInput
            handleValueChange={changeUserInfo}
            value={singleUserData.email || ''}
            fullWidth
            label='Email'
            name='email'
            placeholder='Enter email'
            type='text'
          />
          <CustomDropDown
            handleValueChange={changeUserInfo}
            value={singleUserData.status || ''}
            label='Status'
            name='status'
            placeholder='Enter status'
            options={['active', 'inactive', 'invited']}
          />
          <CustomDropDown
            handleValueChange={changeUserInfo}
            value={singleUserData.gender || ''}
            label='Gender'
            name='gender'
            placeholder='Enter gender'
            options={['male', 'female', 'trans']}
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
        onSave={deleteUser}
        loading={deleteUserLoading}
      >
        <div className={styles.addUser}>Are you sure to delete this user?</div>
      </CustomModal>

      <div className={styles.parent}>
        <div className={styles.parentWrapper}>
          {/** Header of the table*/}
          <TableHeader
            TOTAL_USER={TOTAL_USER}
            TableData={TableData}
            openAdduserModal={openAdduserModal}
          />

          <hr className={styles.devider} />

          {/** table content*/}
          <div className={styles.tableContent}>
            <div className={styles.colums}>
              <div
                className={styles.name}
                onClick={() => {
                  applyFilter('name');
                }}
              >
                <p>Name</p>
                {filterState.name === 1 ? (
                  <ArrowUpwardOutlinedIcon />
                ) : (
                  <ArrowDownwardOutlinedIcon />
                )}
              </div>
              <div
                className={styles.status}
                onClick={() => {
                  applyFilter('status');
                }}
              >
                <p>Status</p>
                {filterState.status === 1 ? (
                  <ArrowUpwardOutlinedIcon />
                ) : (
                  <ArrowDownwardOutlinedIcon />
                )}
              </div>
              <div
                className={styles.role}
                onClick={() => {
                  applyFilter('gender');
                }}
              >
                <p>Gender</p>
                {filterState.gender === 1 ? (
                  <ArrowUpwardOutlinedIcon />
                ) : (
                  <ArrowDownwardOutlinedIcon />
                )}
              </div>
              <div
                className={styles.login}
                onClick={() => {
                  applyFilter('id');
                }}
              >
                <p>ID</p>
                {filterState.id === 1 ? (
                  <ArrowUpwardOutlinedIcon />
                ) : (
                  <ArrowDownwardOutlinedIcon />
                )}
              </div>
              <div className={styles.login}></div>
            </div>
            <hr className={styles.devider} />

            {TableData?.map((row, index) => {
              return (
                <div key={index}>
                  <SingleRow
                    rowData={row}
                    setDeleteModal={setDeleteUserModal}
                    setEditModal={setAddUserModal}
                    handleUserDelete={handleUserDelete}
                    handleUserEdit={handleUserEdit}
                  />
                  <hr className={styles.devider} />
                </div>
              );
            })}

            <CustomPagination
              currentPage={currentPage}
              showPerPage={PAGE_LIMIT}
              setCurrentPage={changeActivePage}
              total={TOTAL_USER}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TablePage;
