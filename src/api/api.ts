import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as SecureStore from 'expo-secure-store';
import { env } from '@/config/environments';
import { CreateUserRequest, UserInfo } from './api.types';

// Base fetch query
const rawBaseQuery = fetchBaseQuery({
  baseUrl: env.base_api_url,
});

// Async wrapper to attach Bearer token

const baseQueryWithBearer = async (args: any, api: any, extraOptions: any) => {
  const accessToken = await SecureStore.getItemAsync('access_token');

  if (accessToken) {
    if (typeof args === 'string') {
      args = { url: args, headers: { Authorization: `Bearer ${accessToken}` } };
    } else if (args.headers) {
      args.headers['Authorization'] = `Bearer ${accessToken}`;
    } else {
      args.headers = { Authorization: `Bearer ${accessToken}` };
    }
  }

  return rawBaseQuery(args, api, extraOptions);
};

// Create the API
export const cdtApi = createApi({
  reducerPath: 'cdtApi',
  baseQuery: baseQueryWithBearer,
  endpoints: (builder) => ({
    createUser: builder.mutation<UserInfo, CreateUserRequest>({
      query: (userData) => ({
        url: 'Account/create',
        method: 'POST',
        body: userData,
      }),
    }),
    listUsers: builder.query<UserInfo[], void>({
      query: () => 'admin/users',
    }),
    getUserInfo: builder.query<UserInfo, void>({
      query: () => 'Account/userinfo',
    }),
    updateUser: builder.mutation<UserInfo, { id: string; data: Partial<CreateUserRequest> }>({
      query: ({ id, data }) => ({
        url: `Account/update/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

// Export hooks
export const { useCreateUserMutation, useListUsersQuery, useGetUserInfoQuery, useUpdateUserMutation } = cdtApi;
