import { useEffect, useState } from 'react';
import { TableDataEntity } from '../classes/interface';
import { useMutation, useQuery } from 'react-query';
import styles from './table.module.scss';
import {
  PAGE_LIMIT,
  POSSIBLE_GENDER,
  POSSIBLE_STATUS,
  sortData,
  TOTAL_USER,
} from '../classes/constant';
import SingleRow from './components/single_row/single_row.component';
import {
  CustomDropDown,
  CustomModal,
  CustomPagination,
} from '../../components';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import CustomInput, {
  CustomInputChangeFuncInterface,
} from '../../components/CustomInput';
import {
  createUser,
  deleteUserById,
  getUsers,
  updateUserById,
} from '../../api';
import TableHeader from './components/table_header/table_header.component';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Snackbar } from '@mui/material';

const TablePage = () => {
  const [TableData, setTableData] = useState<TableDataEntity[]>([{}]);
  const [singleUserData, setSingleUserData] = useState<TableDataEntity>({});
  const [adduserModal, setAddUserModal] = useState<boolean>(false);
  const [deleteuserModal, setDeleteUserModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletedId, setDeletedId] = useState(1);
  const [snackBarMessage, setSnackBarMessage] = useState('');

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
    mutate: deleteUserRefetch,
    isSuccess: deleteUserSuccess,
  } = useMutation(
    'deleteUser',
    async () => {
      return await deleteUserById({ id: deletedId });
    },
    { retry: false }
  );

  const {
    data: updateUserData,
    error: updateUserError,
    isLoading: updateUserLoading,
    mutate: updateUserRefetch,
    isSuccess: updateUsersSuccess,
  } = useMutation(
    'updateUser',
    async () => {
      return await updateUserById({
        id: singleUserData.id!,
        data: singleUserData,
      });
    },
    { retry: false }
  );

  const {
    status: createUserStatus,
    data: createUserData,
    error: createUserError,
    isLoading: createUserLoading,
    mutate: createUserRefetch,
    isSuccess: createUsersSuccess,
  } = useMutation(
    'createUser',
    async () => {
      return await createUser({
        data: singleUserData,
      });
    },
    { retry: false }
  );

  useEffect(() => {
    if (usersData) {
      setTableData(usersData);
    }
  }, [usersData, currentPage]);

  useEffect(() => {
    if (createUserError) {
      setSnackBarMessage(
        `${(createUserError as any)?.response?.data?.[0]?.field} ${
          (createUserError as any)?.response?.data?.[0]?.message
        }`
      );
    }

    if (updateUserError) {
      setSnackBarMessage(
        `${(updateUserError as any)?.response?.data?.[0]?.field} ${
          (updateUserError as any)?.response?.data?.[0]?.message
        }`
      );
    }
    if (deleteUserError) {
      setSnackBarMessage(
        `${(deleteUserError as any)?.response?.data?.[0]?.field} ${
          (deleteUserError as any)?.response?.data?.[0]?.message
        }`
      );
    }
    if (getUsersError) {
      setSnackBarMessage(
        `${(getUsersError as any)?.response?.data?.[0]?.field} ${
          (getUsersError as any)?.response?.data?.[0]?.message
        }`
      );
    }
  }, [createUserError, updateUserError, deleteUserError, getUsersError]);

  useEffect(() => {
    if (deleteUserSuccess) {
      setDeleteUserModal(false);
      getUsersRefetch();
    }
    if (createUsersSuccess) {
      setAddUserModal(false);
      getUsersRefetch();
    }

    if (updateUsersSuccess) {
      setAddUserModal(false);
      getUsersRefetch();
    }
  }, [createUsersSuccess, deleteUserSuccess, updateUsersSuccess]);

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

  const changeUserInfo = (e: CustomInputChangeFuncInterface) => {
    setSingleUserData({ ...singleUserData, [e.name]: e.value });
  };

  const getFilterStateByName = (name: string): number => {
    switch (name) {
      case 'name':
        return filterState.name;
      case 'status':
        return filterState.status;
      case 'gender':
        return filterState.gender;
      case 'id':
        return filterState.id;
    }
    return 1;
  };

  const applyFilter = (filterType: string) => {
    const INV = -1;
    const filteredData = sortData(
      TableData,
      filterType,
      INV * getFilterStateByName(filterType)
    );
    setFilterState({
      ...filterState,
      [filterType]: INV * getFilterStateByName(filterType),
    });
    setTableData([...filteredData]);
  };

  const openAdduserModal = () => {
    setSingleUserData({});
    setAddUserModal(true);
  };

  const saveUser = () => {
    if (singleUserData.id) {
      updateUserRefetch();
    } else {
      createUserRefetch();
    }
  };

  const deleteUser = () => {
    deleteUserRefetch();
  };

  const changeActivePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/**Snackbar to show errors */}
      <Snackbar
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        open={!!snackBarMessage.length}
        onClose={() => setSnackBarMessage('')}
        message={snackBarMessage}
      />

      {/** Modal to add/update user */}
      <CustomModal
        open={adduserModal}
        discardLabel='Cancel'
        saveLabel={singleUserData.id ? 'Update' : 'Save'}
        title={singleUserData.id ? 'Update User' : 'Add User'}
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
          {!singleUserData?.id && (
            <CustomInput
              handleValueChange={changeUserInfo}
              value={singleUserData.email || ''}
              fullWidth
              label='Email'
              name='email'
              placeholder='Enter email'
              type='text'
            />
          )}
          <CustomDropDown
            handleValueChange={changeUserInfo}
            value={singleUserData.status || ''}
            label='Status'
            name='status'
            placeholder='Enter status'
            options={POSSIBLE_STATUS}
          />
          <CustomDropDown
            handleValueChange={changeUserInfo}
            value={singleUserData.gender || ''}
            label='Gender'
            name='gender'
            placeholder='Enter gender'
            options={POSSIBLE_GENDER}
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
          {getUserLoading ? (
            <div className={styles.loadinScreen}>
              <CircularProgress />
            </div>
          ) : (
            <div className={styles.tableContent}>
              <div className={styles.colums}>
                <div
                  className={styles.name}
                  onClick={() => {
                    applyFilter('name');
                  }}
                >
                  <p>Name</p>
                  {filterState.name === -1 ? (
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
                  {filterState.status === -1 ? (
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
                  {filterState.gender === -1 ? (
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
                  {filterState.id === -1 ? (
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
          )}
        </div>
      </div>
    </>
  );
};

export default TablePage;
