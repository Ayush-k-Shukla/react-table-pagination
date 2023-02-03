import axios from 'axios';
import { PAGE_LIMIT } from '../pages/classes/constant';
import { TableDataEntity } from '../pages/classes/interface';

const baseUrl = `https://gorest.co.in/public/v2/users`;
const API = axios.create({ baseURL: baseUrl });
API.defaults.headers.common[
  'Authorization'
] = `Bearer 1e733240b1117df097112f4e9871c1c2ed23afea08c77af0eca3df9f980b8175`;

export const getUsers = async ({
  page,
  per_page = PAGE_LIMIT,
}: {
  page: number;
  per_page?: number;
}) => {
  const res = await API.get<TableDataEntity[]>(
    `?page=${page}&per_page=${per_page}`
  );

  return res.data;
};

export const createUser = async ({ data }: { data: TableDataEntity }) => {
  const res = await API.post(`/`, data);
  return res.data;
};

export const updateUserById = async ({
  id,
  data,
}: {
  id: number;
  data: TableDataEntity;
}) => {
  const res = await API.patch(`/${id}`, data);
  return res.data;
};

export const deleteUserById = async ({ id }: { id: number }) => {
  const res = await API.delete(`/${id}`);
  return res.data;
};
